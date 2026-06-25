import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';
import type { CreateCategory, UpdateCategory } from '../types';
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });
};
export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
  });
};
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCategory) => categoryService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateCategory }) =>
      categoryService.update(id, dto),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', id] });
    },
  });
};
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
