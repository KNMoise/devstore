// src/app/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, createUser } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    try {
      const user = await createUser({ email, password: hashedPassword });
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(400).json({ message: 'Error creating user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
