import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the cart
const initialState = {
  items: [] as any[],
  total: 0,
};

// Action types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const SET_CART = 'SET_CART';
const CALCULATE_TOTAL = 'CALCULATE_TOTAL';

// Reducer function
const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item: any) => item.id !== action.payload.id),
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item: any) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case SET_CART:
      return { ...state, items: action.payload };
    case CALCULATE_TOTAL:
      return {
        ...state,
        total: state.items.reduce(
          (acc: number, item: any) => acc + item.price * item.quantity,
          0
        ),
      };
    default:
      return state;
  }
};

// Create Context
const CartContext = createContext<any>(null);

// Helper functions for API calls
const fetchCartItemsAPI = async (userId: number) => {
  const response = await fetch(`/api/cart/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch cart items');
  return response.json();
};

const addItemToCartAPI = async (item: any) => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error('Failed to add item to cart');
  return response.json();
};

const removeItemFromCartAPI = async (itemId: number) => {
  const response = await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to remove item from cart');
};

const updateItemQuantityAPI = async (itemId: number, quantity: number) => {
  const response = await fetch(`/api/cart/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error('Failed to update item quantity');
  return response.json();
};

// CartProvider component to wrap your app and provide the cart context
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch cart items and set cart state
  const fetchCartItems = async (userId: number) => {
    try {
      const cartData = await fetchCartItemsAPI(userId);
      dispatch({ type: SET_CART, payload: cartData });
    } catch (error) {
      console.error(error);
    }
  };

  // Add item to cart and update state
  const addItemToCart = async (item: any) => {
    try {
      const newItem = await addItemToCartAPI(item);
      dispatch({ type: ADD_ITEM, payload: newItem });
    } catch (error) {
      console.error(error);
    }
  };

  // Remove item from cart
  const removeItemFromCart = async (itemId: number) => {
    try {
      await removeItemFromCartAPI(itemId);
      dispatch({ type: REMOVE_ITEM, payload: { id: itemId } });
    } catch (error) {
      console.error(error);
    }
  };

  // Update item quantity
  const updateItemQuantity = async (itemId: number, quantity: number) => {
    try {
      const updatedItem = await updateItemQuantityAPI(itemId, quantity);
      dispatch({ type: UPDATE_ITEM, payload: updatedItem });
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate total price of items in cart
  const calculateTotal = () => {
    dispatch({ type: CALCULATE_TOTAL });
  };

  useEffect(() => {
    if (state.items.length === 0) {
      const userId = 1; // Placeholder for the current user's ID
      fetchCartItems(userId);
    }
  }, [state.items]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems: state.items,
//         total: state.total,
//         addItemToCart,
//         removeItemFromCart,
//         updateItemQuantity,
//         calculateTotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
};

// Custom hook to use cart state
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
  
};

