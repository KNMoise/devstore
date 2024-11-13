import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, description, price, stock, imageUrl } = await req.json();

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl: imageUrl || '',
      },
    });
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Error creating product', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
