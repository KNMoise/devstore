import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch users', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
