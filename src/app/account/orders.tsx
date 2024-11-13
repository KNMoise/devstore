// src/app/account/orders.tsx
import React, { useEffect, useState } from 'react';

interface Order {
  id: number;
  date: string;
  status: string;
  totalAmount: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <h2>Order #{order.id}</h2>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.totalAmount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
