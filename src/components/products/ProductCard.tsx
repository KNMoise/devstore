// src/components/products/ProductCard.tsx
import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, description }) => {
  return (
    <div className="border rounded-md p-4">
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="font-bold">${price.toFixed(2)}</p>
      <Link href={`/products/${id}`}>
        <Button>View Details</Button>
      </Link>
    </div>
  );
};

export default ProductCard;
