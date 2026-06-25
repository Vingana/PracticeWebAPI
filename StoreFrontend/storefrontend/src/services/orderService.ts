import { api } from './api';
import type { Order, CreateOrder, UpdateOrderStatus } from '../types';
export const orderService = {
  getAll: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },
  getById: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  getByEmail: async (email: string): Promise<Order[]> => {
    const response = await api.get('/orders/by-email', {
      params: { email },
    });
    return response.data;
  },
  create: async (dto: CreateOrder): Promise<Order> => {
    const response = await api.post('/orders', dto);
    return response.data;
  },
  updateStatus: async (id: number, dto: UpdateOrderStatus): Promise<void> => {
    await api.patch(`/orders/${id}/status`, dto);
  },
};
