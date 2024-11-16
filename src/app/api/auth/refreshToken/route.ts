import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMTUxMzEzMSwiaWF0IjoxNzMxNTEzMTMxfQ.Rb2NgjgnhN2uCYLriKVgKfNPPxuuCaI7tIj0Atztwfs';

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const newToken = jwt.sign({ id: decoded.id, email: decoded.email }, JWT_SECRET, { expiresIn: '1h' });
    return new Response(JSON.stringify({ token: newToken }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Token refresh failed', { status: 401 });
  }
}
