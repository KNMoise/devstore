import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMTUxMzEzMSwiaWF0IjoxNzMxNTEzMTMxfQ.Rb2NgjgnhN2uCYLriKVgKfNPPxuuCaI7tIj0Atztwfs'; //';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
