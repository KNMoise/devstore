import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { GetServerSideProps } from "next";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
};

const prisma = new PrismaClient();

type ProductsPageProps = {
  products: Product[];
};

export default function ProductsPage({ products }: ProductsPageProps) {
  return (
    <div className="products-page">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="products-list grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="product-card p-4 border rounded">
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="mb-2" />
            )}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
            <Link href={`/products/${product.id}`}>
              <a className="text-blue-500 hover:underline">View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
    },
  });

  return {
    props: { products },
  };
};
