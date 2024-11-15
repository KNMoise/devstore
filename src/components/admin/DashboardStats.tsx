// src/app/components/admin/DashboardStats.tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DashboardStatsProps = {
  userCount: number;
  orderCount: number;
  productCount: number;
  incomeBalance: number;  // Adding the income balance
};

export default function DashboardStats({
  userCount,
  orderCount,
  productCount,
  incomeBalance,
}: DashboardStatsProps) {
  return (
    <div className="dashboard-stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="stat-card p-4 bg-blue-500 text-white rounded shadow-md">
        <h3 className="text-xl font-semibold">Total Users</h3>
        <p className="text-2xl">{userCount}</p>
      </div>
      <div className="stat-card p-4 bg-green-500 text-white rounded shadow-md">
        <h3 className="text-xl font-semibold">Total Orders</h3>
        <p className="text-2xl">{orderCount}</p>
      </div>
      <div className="stat-card p-4 bg-yellow-500 text-white rounded shadow-md">
        <h3 className="text-xl font-semibold">Total Products</h3>
        <p className="text-2xl">{productCount}</p>
      </div>
      {/* New Income Balance stat card */}
      <div className="stat-card p-4 bg-purple-500 text-white rounded shadow-md">
        <h3 className="text-xl font-semibold">Income Balance</h3>
        <p className="text-2xl">${incomeBalance.toFixed(2)}</p>
      </div>
    </div>
  );
}
