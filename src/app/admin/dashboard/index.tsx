// src/app/admin/dashboard/index.tsx
import { PrismaClient } from '@prisma/client';
import React from 'react';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

const prisma = new PrismaClient();

// Type definitions for data fetching
type DashboardData = {
  productCount: number;
  orderCount: number;
  userCount: number;
  incomeBalance: number;  // New field for income balance
};

const AdminDashboard: React.FC<{ dashboardData: DashboardData }> = ({ dashboardData }) => {
  const [data, setData] = useState<DashboardData>(dashboardData);

  useEffect(() => {
    // Optionally, you could refresh data on the client side here (if needed)
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
          <p className="text-4xl font-bold text-blue-600">{data.productCount}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-4xl font-bold text-green-600">{data.orderCount}</p>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-yellow-600">{data.userCount}</p>
        </div>

        {/* Income Balance */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Income Balance</h2>
          <p className="text-4xl font-bold text-purple-600">${data.incomeBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Optionally, you could add more data, charts, or other visual elements here */}
    </div>
  );
};

// Server-side function to fetch data from the database
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    const userCount = await prisma.user.count();
    
    // Fetching the total income balance (completed orders)
    const incomeBalance = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: {
          in: ['shipped', 'delivered'], // Only completed orders
        },
      },
    });

    // Return the data as props
    return {
      props: {
        dashboardData: {
          productCount,
          orderCount,
          userCount,
          incomeBalance: incomeBalance._sum.totalAmount || 0, // Income balance is 0 if no completed orders
        },
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      props: {
        dashboardData: {
          productCount: 0,
          orderCount: 0,
          userCount: 0,
          incomeBalance: 0, // Default value in case of error
        },
      },
    };
  }
};

export default AdminDashboard;
