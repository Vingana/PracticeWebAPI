import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../services/cartService';
import type { AddCartItem } from '../types';
const CART_KEY = ['cart'] as const;
export const useCart = () => {
  return useQuery({
    queryKey: CART_KEY,
    queryFn: () => cartService.getCart(),
  });
};
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AddCartItem) => cartService.addItem(dto),
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(CART_KEY, updatedCart);
    },
  });
};
export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      cartService.updateQuantity(productId, quantity),
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(CART_KEY, updatedCart);
    },
  });
};
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => cartService.removeItem(productId),
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(CART_KEY, updatedCart);
    },
  });
};
export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartService.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
};
