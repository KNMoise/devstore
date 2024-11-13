import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/react';

type CartItem = {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
};

const prisma = new PrismaClient();

type CheckoutPageProps = {
  initialCartItems: CartItem[];
};

export default function CheckoutPage({ initialCartItems }: CheckoutPageProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalAmount(total);
    };
    calculateTotal();
  }, [cartItems]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    try {
      // Redirect based on the selected payment method
      if (paymentMethod === 'mobileMoney') {
        await router.push('/api/payment/mobile-money');
      } else if (paymentMethod === 'paypal') {
        await router.push('/api/payment/paypal');
      }
    } catch (error) {
      console.error('Error during payment redirect:', error);
      router.push('/checkout/cancel');
    }
  };

  const handleOrderCreation = async () => {
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session?.user?.email, cartItems, totalAmount }),
      });

      if (response.ok) {
        router.push('/checkout/success');
      } else {
        router.push('/checkout/cancel');
      }
    } catch (error) {
      console.error('Error processing checkout:', error);
      router.push('/checkout/cancel');
    }
  };

  const handleCheckout = async () => {
    await handlePayment();
    await handleOrderCreation();
  };

  return (
    <div className="checkout-page">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <div className="checkout-items">
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <p>{item.product.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      <div className="payment-options">
        <h2>Select Payment Method</h2>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="mobileMoney"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Mobile Money
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          PayPal
        </label>
      </div>
      <div className="checkout-summary">
        <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
        <button onClick={handleCheckout} className="confirm-button">Confirm and Pay</button>
      </div>
    </div>
  );
}

// Fetch initial cart items for SSR
export async function getServerSideProps(context: any) {
  const { userId } = context.req.cookies;

  const initialCartItems = await prisma.cartItem.findMany({
    where: { userId: Number(userId) },
    include: { product: true },
  });

  return {
    props: {
      initialCartItems,
    },
  };
}
