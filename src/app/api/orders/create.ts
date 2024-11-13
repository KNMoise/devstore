
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, items } = await req.json(); 

  try {
    const total = items.reduce((acc: number, item: { productId: number; quantity: number; price: number }) => acc + item.quantity * item.price, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map((item: { productId: number; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create order', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
