// src/app/api/products/create.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, description, price, stock, imageUrl } = await req.json();
    // Ensure required fields are provided
    if (!name || !price || !stock) {
      return NextResponse.json({ error: "Name, price, and stock are required" }, { status: 400 });
    }
    // Create the product in the database
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || '',
        price,
        stock,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
