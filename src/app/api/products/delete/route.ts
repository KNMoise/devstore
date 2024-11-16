import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
}
