// src/app/api/orders/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createOrder } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, products } = req.body;
    const order = await createOrder(userId, products);
    res.status(201).json(order);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
