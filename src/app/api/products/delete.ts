import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
  const { productId } = params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(productId),
      },
    });
    return new Response(JSON.stringify(deletedProduct), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error deleting product', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
