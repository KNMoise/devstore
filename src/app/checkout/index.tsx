// src/app/checkout/index.tsx
import { useState } from 'react';

const CheckoutPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleCheckout = () => {
    console.log(`Checking out for ${name} at ${address}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-4">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded">
        Complete Checkout
      </button>
    </div>
  );
};

export default CheckoutPage;
