import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="cancel-page">
      <h1 className="text-2xl font-semibold mb-4">Order Canceled</h1>
      <p>Your order has been canceled. If you wish to proceed with checkout, please try again.</p>
      <Link href="/cart">
        <a className="return-to-cart-button">Return to Cart</a>
      </Link>
    </div>
  );
}
