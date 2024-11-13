import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    // Fetch a user by ID
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  } else if (req.method === 'PUT') {
    // Update a user's details
    const { email, name } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: { email, name },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
