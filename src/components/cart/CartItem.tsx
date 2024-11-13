// src/components/cart/CartItem.tsx
import React from 'react';
import Button from '../ui/Button';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, onRemove }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h4>{name}</h4>
        <p>Quantity: {quantity}</p>
      </div>
      <div>
        <p>${(price * quantity).toFixed(2)}</p>
        <Button onClick={() => onRemove(id)}>Remove</Button>
      </div>
    </div>
  );
};

export default CartItem;
