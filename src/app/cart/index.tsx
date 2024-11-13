// src/app/cart/index.tsx
import { useCartStore } from '../../store/cart';

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item.productId} className="p-4 border rounded shadow-sm mb-4">
            <p>Product ID: {item.productId}</p>
            <p>Quantity: {item.quantity}</p>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => removeFromCart(item.productId)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
