// src/app/components/cart/CartSummary.tsx
import React, { useEffect, useState } from 'react';

type CartSummaryProps = {
  cartItems: { id: number; quantity: number; price: number }[];
};

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const calculateSummary = () => {
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

      setTotalPrice(totalAmount);
      setTotalQuantity(totalQty);
    };

    calculateSummary();
  }, [cartItems]);

  return (
    <div className="cart-summary bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Cart Summary</h2>
      <div className="summary-details mt-4">
        <p className="text-lg">Total Items: {totalQuantity}</p>
        <p className="text-xl font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartSummary;
