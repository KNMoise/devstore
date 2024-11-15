// src/app/components/products/ProductDetails.tsx
import { PrismaClient } from "@prisma/client";
import { Product } from ".prisma/client";
import { useRouter } from "next/router";

const prisma = new PrismaClient();

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details p-6">
      <div className="product-image">
        <img
          src={product.imageUrl || "/default-product-image.jpg"}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
      </div>
      <div className="product-info mt-6">
        <h2 className="text-3xl font-semibold">{product.name}</h2>
        <p className="text-xl text-gray-700 mt-2">${product.price}</p>
        <p className="text-lg text-gray-600 mt-4">{product.description}</p>
        <button className="bg-blue-600 text-white p-2 rounded mt-6">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const products = await prisma.product.findMany();
  const paths = products.map((product: { id: { toString: () => any; }; }) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  return {
    props: {
      product,
    },
  };
}

export default ProductDetails;
