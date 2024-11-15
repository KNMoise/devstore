import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, password } = await req.json(); // Get the user data from the request body

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response('User already exists', { status: 400 });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Respond with the newly created user data (excluding password for security)
    const { password: _, ...userWithoutPassword } = newUser;
    return new Response(JSON.stringify(userWithoutPassword), { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response('Failed to register user', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
