// src/app/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmail } from '../../../lib/db';
import { verifyPassword, generateToken } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (user && verifyPassword(password, user.password)) {
      const token = generateToken(user.id);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
