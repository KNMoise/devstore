// src/app/api/auth/logout.ts
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // If using cookies for sessions, clear here.
    res.status(200).json({ message: 'Logged out successfully' });
  }
  