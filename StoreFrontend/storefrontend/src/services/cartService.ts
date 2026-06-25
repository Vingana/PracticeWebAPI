import { api } from './api';
import type { Cart, AddCartItem } from '../types';
export const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/cart');
    return response.data;
  },
  addItem: async (dto: AddCartItem): Promise<Cart> => {
    const response = await api.post('/cart/add', dto);
    return response.data;
  },
  updateQuantity: async (productId: number, quantity: number): Promise<Cart> => {
    const response = await api.put('/cart/update', null, {
      params: { productId, quantity },
    });
    return response.data;
  },
  removeItem: async (productId: number): Promise<Cart> => {
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
  },
  clear: async (): Promise<void> => {
    await api.delete('/cart/clear');
  },
};
