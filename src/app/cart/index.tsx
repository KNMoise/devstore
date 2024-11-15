// src/app/components/cart/CartPage.tsx
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

type CartItem = {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
};

type SessionUser = {
  id: number;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type CustomSession = {
  user: SessionUser;
};

const { data: session } = useSession() as { data: CustomSession | null };

const prisma = new PrismaClient();

type CartPageProps = {
  initialCartItems: CartItem[];
};

export default function CartPage({ initialCartItems }: CartPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [total, setTotal] = useState(0);

  // Calculate total price of items in cart
  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(newTotal);
    };
    calculateTotal();
  }, [cartItems]);

  const handleRemoveItem = async (itemId: number) => {
    try {
      // Send DELETE request to API to remove item
      const response = await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      if (response.ok) {
        // Remove the item from the cart state
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } else {
        throw new Error("Failed to remove item.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        // Update the cart state directly with the updated item
        setCartItems((prevItems) =>
          prevItems.map((item) => (item.id === itemId ? updatedItem : item))
        );
      } else {
        throw new Error("Failed to update item quantity.");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  return (
    <div className="cart-page">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-details flex justify-between p-4">
              <p className="item-name">{item.product.name}</p>
              <p className="item-price">${item.price}</p>
              <div className="quantity-wrapper flex items-center">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="quantity-input w-16 p-2 border rounded-md"
                />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-item-button ml-4 text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="cart-summary mt-6 p-4 bg-gray-100 rounded-md">
        <p className="total-price text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <button className="checkout-button mt-4 p-2 bg-blue-500 text-white rounded-md">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

// Fetch initial cart items for SSR
export async function getServerSideProps(context: any) {
  const { userId } = context.req.cookies; // Assuming user ID is stored in cookies

  const initialCartItems = await prisma.cartItem.findMany({
    where: { userId: Number(userId) },
    include: { product: true },
  });

  return {
    props: {
      initialCartItems,
    },
  };
}
