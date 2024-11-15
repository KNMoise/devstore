// src/app/components/layout/Header.tsx
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="logo">
        <Link href="/">
          <h1 className="text-xl font-bold">devstore</h1>
        </Link>
      </div>
      <nav className="flex space-x-6">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/orders">Orders</Link>
        {session ? (
          <Link href="/profile">Welcome, {session.user?.name}</Link>
        ) : (
          <Link href="/auth/signin">Sign In</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
