// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed users
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password_here',
    },
  });

  // Seed products
  await prisma.product.createMany({
    data: [
      { name: 'Product A', description: 'Description A', price: 100.0, stock: 50 },
      { name: 'Product B', description: 'Description B', price: 200.0, stock: 30 },
    ],
  });

  console.log('Database seeded!');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
