// src/store/cart.ts
import { atom, useAtom } from 'jotai';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const cartAtom = atom<CartItem[]>([]);

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const addItem = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return { cart, addItem, removeItem };
};
