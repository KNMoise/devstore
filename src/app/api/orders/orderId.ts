
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = parseInt(searchParams.get('orderId') || '');

  if (isNaN(orderId)) {
    return new Response('Invalid order ID', { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        items: true,
      },
    });

    if (!order) {
      return new Response('Order not found', { status: 404 });
    }

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to retrieve order', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
