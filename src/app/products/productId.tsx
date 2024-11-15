import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
};

const prisma = new PrismaClient();

type ProductDetailPageProps = {
  product: Product;
};

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const router = useRouter();

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail">
      <button onClick={() => router.back()} className="text-blue-500 mb-4">
        Go Back
      </button>
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} className="mb-4" />
      )}
      <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
      <p className="text-gray-700 text-lg">${product.price.toFixed(2)}</p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params!;

  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
    },
  });

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
  };
};
