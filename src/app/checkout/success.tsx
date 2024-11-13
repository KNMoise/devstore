import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="success-page">
      <h1 className="text-2xl font-semibold mb-4">Order Successful!</h1>
      <p>Your order has been successfully placed. Thank you for shopping with us!</p>
      <Link href="/products">
        <a className="continue-shopping-button">Continue Shopping</a>
      </Link>
    </div>
  );
}
