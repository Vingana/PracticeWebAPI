import { api } from './api';
import type { Category, CreateCategory, UpdateCategory } from '../types';
export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },
  getById: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
  create: async (dto: CreateCategory): Promise<Category> => {
    const response = await api.post('/categories', dto);
    return response.data;
  },
  update: async (id: number, dto: UpdateCategory): Promise<void> => {
    await api.put(`/categories/${id}`, dto);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
