import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: true,
      },
    });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to retrieve orders', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
