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
      <div className="grid grid-cols-3 gap-6">
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

    // Pass data to the page component as props
    return {
      props: {
        dashboardData: {
          productCount,
          orderCount,
          userCount,
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
        },
      },
    };
  }
};

export default AdminDashboard;
