import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';
import type { CreateProduct, UpdateProduct } from '../types';
export const useProducts = (search?: string, categoryId?: number) => {
  return useQuery({
    queryKey: ['products', { search, categoryId }],
    queryFn: () => productService.getAll(search, categoryId),
  });
};
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateProduct) => productService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateProduct }) =>
      productService.update(id, dto),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
