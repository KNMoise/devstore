import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Compare the password with the hashed password stored in the database
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return new NextResponse('Invalid password', { status: 401 });
    }

    // Create a session or JWT token
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMTUxMzEzMSwiaWF0IjoxNzMxNTEzMTMxfQ.Rb2NgjgnhN2uCYLriKVgKfNPPxuuCaI7tIj0Atztwfs'; // You can use a JWT library to generate a token
    const serialized = serialize('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    // Send the token in a cookie for session management
    return new NextResponse('Login successful', {
      status: 200,
      headers: {
        'Set-Cookie': serialized,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to login', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
