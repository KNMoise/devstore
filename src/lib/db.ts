// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: { orders: true }
  });
};

export const createOrder = async (userId: number, productId: number, quantity: number) => {
  return prisma.order.create({
    data: {
      userId,
      productId,
      quantity,
      totalAmount: await calculateTotal(productId, quantity)
    }
  });
};

const calculateTotal = async (productId: number, quantity: number) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  return product ? product.price * quantity : 0;
};
