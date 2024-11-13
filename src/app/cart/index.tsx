import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession() as { data: CustomSession | null };
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

  // Fetch cart items for the user from the database
  useEffect(() => {
    async function fetchCartItems() {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/cart/${session.user.id}`);
          const data = await response.json();
          setCartItems(data);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    }
    fetchCartItems();
  }, [session]);

  const handleRemoveItem = async (itemId: number) => {
    try {
      await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
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
      const updatedItem = await response.json();

      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? updatedItem : item))
      );
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
            <div className="item-details">
              <p className="item-name">{item.product.name}</p>
              <p className="item-price">${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="quantity-input"
              />
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="remove-item-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p className="total-price">Total: ${total.toFixed(2)}</p>
        <button className="checkout-button">Proceed to Checkout</button>
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
