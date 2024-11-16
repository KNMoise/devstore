import { PrismaClient } from '@prisma/client';
import { createOrder } from '../../../../lib/db';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, items, paymentMethod } = await req.json();

  if (!paymentMethod) {
    return new Response(JSON.stringify({ error: 'Payment method is required' }), { status: 400 });
  }

  try {
    // Calculate the total amount based on items
    const totalAmount = items.reduce((acc: number, item: { productId: number; quantity: number; price: number }) => {
      return acc + item.quantity * item.price;
    }, 0);

    // 1. Handle Payment Processing
    let paymentSuccess = false;
    if (paymentMethod === 'mobileMoney') {
      paymentSuccess = await processMobileMoneyPayment(userId, totalAmount);
    } else if (paymentMethod === 'paypal') {
      paymentSuccess = await processPayPalPayment(userId, totalAmount);
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported payment method' }), { status: 400 });
    }

    // 2. If payment failed, return an error response
    if (!paymentSuccess) {
      return new Response(JSON.stringify({ error: 'Payment processing failed' }), { status: 402 });
    }

    // 3. Create order with associated order items if payment is successful
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: 'pending',
        orderItems: {
          create: items.map((item: { productId: number; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return new Response(JSON.stringify({ order }), { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Function to simulate Mobile Money payment processing
async function processMobileMoneyPayment(userId: number, amount: number): Promise<boolean> {
  try {
    // Placeholder for actual Mobile Money API integration
    console.log(`Processing Mobile Money payment for User ${userId} with amount $${amount}`);
    // Simulate successful payment
    return true;
  } catch (error) {
    console.error('Mobile Money payment failed:', error);
    return false;
  }
}

// Function to simulate PayPal payment processing
async function processPayPalPayment(userId: number, amount: number): Promise<boolean> {
  try {
    // Placeholder for actual PayPal API integration
    console.log(`Processing PayPal payment for User ${userId} with amount $${amount}`);
    // Simulate successful payment
    return true;
  } catch (error) {
    console.error('PayPal payment failed:', error);
    return false;
  }
}
