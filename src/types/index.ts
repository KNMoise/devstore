// src/types/index.ts

// Common types for database models

/**
 * Represents a product in the database.
 */
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  /**
   * Represents an item in a user's shopping cart.
   */
  export interface CartItem {
    price: number;
    id: number;
    productId: number;
    userId: number;
    quantity: number;
    product?: Product; // Optional: To include product details
    createdAt: Date;
    updatedAt: Date;
  }
  
  /**
   * Represents a user in the database.
   */
  export interface User {
    id: number;
    email: string;
    password?: string; // Optional for internal usage
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  /**
   * Represents an order in the system.
   */
  export interface Order {
    id: number;
    userId: number;
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled'; // Example statuses
    createdAt: Date;
    updatedAt: Date;
    items?: OrderItem[]; // Optional: To include order items
  }
  
  /**
   * Represents an item in an order.
   */
  export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    product?: Product; // Optional: To include product details
    createdAt: Date;
    updatedAt: Date;
  }
  
  /**
   * API response wrapper type for better type safety.
   */
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }
  
  // Utility types for frontend use
  
  /**
   * Represents the shape of the cart context.
   */
  export interface CartContextType {
    cartItems: CartItem[];
    total: number;
    addItemToCart: (item: CartItem) => Promise<void>;
    removeItemFromCart: (itemId: number) => Promise<void>;
    updateItemQuantity: (itemId: number, quantity: number) => Promise<void>;
    calculateTotal: () => void;
  }
  
  /**
   * Represents a generic pagination structure.
   */
  export interface Pagination<T> {
    items: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }
  
  // Example usage of utility types in APIs
  /**
   * Example type for a paginated API response containing products.
   */
  export type ProductPaginationResponse = ApiResponse<Pagination<Product>>;
  