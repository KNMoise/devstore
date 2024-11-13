import React, { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OrderWithUser {
  id: number;
  user: { name: string; email: string };
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<OrderWithUser[]>([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders');
      const data: OrderWithUser[] = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  // Handle status update
  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    const res = await fetch(`/api/orders/${orderId}/updateStatus`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      // Re-fetch orders after update
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } else {
      console.error('Failed to update order status');
    }
  };

  return (
    <div>
      <h1>Order Management</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">
                {order.user.name} ({order.user.email})
              </td>
              <td className="border p-2">${order.totalPrice.toFixed(2)}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => updateOrderStatus(order.id, 'shipped')}
                >
                  Ship
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                >
                  Mark as Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagementPage;
