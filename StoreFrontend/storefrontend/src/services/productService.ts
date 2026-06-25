import { api } from './api';
import type { Product, CreateProduct, UpdateProduct } from '../types';
export const productService = {
  getAll: async (search?: string, categoryId?: number): Promise<Product[]> => {
    const response = await api.get('/products', {
      params: { search, categoryId },
    });
    return response.data;
  },
  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  create: async (dto: CreateProduct): Promise<Product> => {
    const response = await api.post('/products', dto);
    return response.data;
  },
  update: async (id: number, dto: UpdateProduct): Promise<void> => {
    await api.put(`/products/${id}`, dto);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
