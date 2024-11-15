import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to fetch all products
export const getAllProducts = async () => {
  try {
    return await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

// Function to fetch a product by ID
export const getProductById = async (productId: number) => {
  try {
    return await prisma.product.findUnique({
      where: { id: productId },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Error fetching product');
  }
};

// Function to create a new order
export const createOrder = async (userId: number, totalAmount: number, items: any[]) => {
  try {
    return await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: 'pending',
        orderItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Error creating order');
  }
};

// Function to fetch user's cart
export const getUserCart = async (userId: number) => {
  try {
    return await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw new Error('Error fetching cart items');
  }
};

// Function to update cart item quantity
export const updateCartItemQuantity = async (itemId: number, quantity: number) => {
  try {
    return await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw new Error('Error updating cart item');
  }
};

// Function to remove item from cart
export const removeItemFromCart = async (itemId: number) => {
  try {
    return await prisma.cartItem.delete({
      where: { id: itemId },
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw new Error('Error removing item from cart');
  }
};

// Disconnect Prisma client when necessary (e.g., in serverless environments)
export const disconnectDb = async () => {
  await prisma.$disconnect();
};
