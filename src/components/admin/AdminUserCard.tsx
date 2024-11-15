import { PrismaClient } from '@prisma/client';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

type AdminUserCardProps = {
  user: User;
};

const prisma = new PrismaClient();

export default function AdminUserCard({ user }: AdminUserCardProps) {
  return (
    <div className="admin-user-card p-4 bg-white border rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      <div className="mt-2">
        <button className="text-blue-500 hover:underline">Edit</button>
        <button className="ml-4 text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
}
