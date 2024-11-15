import { PrismaClient } from '@prisma/client'; // Import PrismaClient
import { Product } from '.prisma/client'; // Import Product type from generated Prisma types
import ProductCard from './ProductCard';

const prisma = new PrismaClient();

type ProductListProps = {
  products: Product[]; // The products array is typed as an array of Product
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const products = await prisma.product.findMany(); // Query to fetch all products

  return {
    props: {
      products,
    },
  };
}

export default ProductList;
