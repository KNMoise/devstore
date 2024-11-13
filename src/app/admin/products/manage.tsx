import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data: Product[] = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const deleteProduct = async (productId: number) => {
    const res = await fetch(`/api/products/${productId}/delete`, {
      method: 'DELETE',
    });

    if (res.ok) {
      // Remove the deleted product from the state
      setProducts(products.filter((product) => product.id !== productId));
    } else {
      console.error('Failed to delete product');
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2">${product.price.toFixed(2)}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => window.location.href = `/admin/products/edit/${product.id}`}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagementPage;
