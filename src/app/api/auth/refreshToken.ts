// src/app/api/auth/refreshToken.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken, generateToken } from '../../../lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  try {
    const userData = verifyToken(token);
    const newToken = generateToken(userData.id);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Token expired' });
  }
}
