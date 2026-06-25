import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';
import type { CreateOrder, UpdateOrderStatus } from '../types';
export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getAll(),
  });
};
export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
  });
};
export const useOrdersByEmail = (email: string) => {
  return useQuery({
    queryKey: ['orders', 'by-email', email],
    queryFn: () => orderService.getByEmail(email),
    enabled: !!email,
  });
};
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateOrder) => orderService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateOrderStatus }) =>
      orderService.updateStatus(id, dto),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
