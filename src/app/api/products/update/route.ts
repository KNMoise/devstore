import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, name, description, price, stock, imageUrl } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, stock, imageUrl },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
}
