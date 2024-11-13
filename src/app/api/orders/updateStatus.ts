import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const { status } = await req.json();

  try {
    // Update the order's status in the database
    const updatedOrder = await prisma.order.update({
      where: {
        id: parseInt(orderId),
      },
      data: {
        status: status,
      },
    });

    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (error) {
    console.error('Error updating order status:', error);
    return new Response('Error updating order status', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

