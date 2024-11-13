import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT: Update product
export async function PUT(req: Request, { params }: { params: { productId: string } }) {
  const { productId } = params;
  const { name, description, price, stock, imageUrl } = await req.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(productId) },
      data: {
        name,
        description,
        price,
        stock,
        imageUrl: imageUrl || '', // Optional field, default to an empty string if not provided
      },
    });

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return new Response('Error updating product', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
