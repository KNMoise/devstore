import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";

// Extend the Session type to include the role property
declare module "next-auth" {
  interface Session {
    user: {
      [x: string]: ReactNode;
      role?: string;
    };
  }
}
import Link from "next/link";
import { ReactNode } from "react";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="sidebar bg-gray-900 text-white w-64 p-6 h-full">
      <div className="flex flex-col space-y-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </Link>
        <Link href="/profile">
          <p className="text-lg">Profile</p>
        </Link>
        <Link href="/orders">
          <p className="text-lg">Orders</p>
        </Link>
        <Link href="/products">
          <p className="text-lg">Products</p>
        </Link>
        <Link href="/cart">
          <p className="text-lg">Cart</p>
        </Link>
        {session?.user?.role === "admin" && (
          <>
            <Link href="/admin">
              <p className="text-lg">Admin Panel</p>
            </Link>
            <Link href="/admin/products">
              <p className="text-lg">Manage Products</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
