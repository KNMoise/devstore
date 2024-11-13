import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DELETE a user by ID
export async function DELETE(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(userId), // Ensure the ID is an integer
      },
    });

    return new Response(JSON.stringify(deletedUser), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete user', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
