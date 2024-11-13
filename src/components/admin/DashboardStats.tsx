// src/components/admin/DashboardStats.tsx
import React from 'react';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-green-100 rounded-md">
        <h2>Total Sales</h2>
        <p>$5000</p>
      </div>
      <div className="p-4 bg-blue-100 rounded-md">
        <h2>Total Orders</h2>
        <p>200</p>
      </div>
      <div className="p-4 bg-yellow-100 rounded-md">
        <h2>Total Users</h2>
        <p>150</p>
      </div>
    </div>
  );
};

export default DashboardStats;
