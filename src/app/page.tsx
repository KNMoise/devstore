import { getAllProducts } from "@/lib/db"; // Adjust the path based on your project structure
import ProductList from "@/components/products/ProductList";

export default async function HomePage() {
  // Fetch products
  const products = await getAllProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <ProductList products={products} />
    </div>
  );
}
