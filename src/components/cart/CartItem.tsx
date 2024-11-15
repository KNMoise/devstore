import { PrismaClient } from '@prisma/client';
import React, { useState } from 'react';

const prisma = new PrismaClient();

type CartItemProps = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  productName: string;
  onQuantityChange: (id: number, quantity: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  productId,
  quantity,
  price,
  productName,
  onQuantityChange,
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(event.target.value);
    setItemQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  const handleRemove = async () => {
    try {
      await fetch(`/api/cart/remove/${id}`, {
        method: 'DELETE',
      });
      // Logic to update cart state (e.g., reroute or refetch)
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart-item flex justify-between items-center p-4 bg-white shadow-md rounded-lg mb-4">
      <div>
        <h3 className="font-semibold">{productName}</h3>
        <p>Price: ${price}</p>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          min="1"
          value={itemQuantity}
          onChange={handleQuantityChange}
          className="quantity-input p-2 border rounded-md"
        />
        <button onClick={handleRemove} className="remove-btn text-red-600 ml-4">
          Remove
        </button>
      </div>
      <div>
        <p className="text-lg font-semibold">Total: ${(itemQuantity * price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
