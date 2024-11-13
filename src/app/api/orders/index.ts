import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,  // Include related user data if needed
        orderItems: true,  // Include order items if needed
      },
    });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error fetching orders', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
