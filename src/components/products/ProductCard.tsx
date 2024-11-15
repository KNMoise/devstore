import Link from "next/link";
import { PrismaClient } from '@prisma/client'; // Import PrismaClient
import { Product } from '.prisma/client'; // Import Product type from generated Prisma types

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.imageUrl || "/default-product-image.jpg"}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-lg text-gray-700">${product.price}</p>
        <Link href={`/products/${product.id}`}>
          <a className="text-blue-600 hover:underline mt-2 inline-block">View Details</a>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
