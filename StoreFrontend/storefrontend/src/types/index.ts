export interface Product {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  imageURL?: string;
  categoryId: number;
  categoryName: string;
}
export interface CreateProduct {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  imageURL?: string;
  categoryId: number;
}
export interface UpdateProduct {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  imageURL?: string;
  categoryId: number;
}
export interface Category {
  id: number;
  name: string;
  productsCount: number;
}
export interface CreateCategory {
  name: string;
}
export interface UpdateCategory {
  name: string;
}
export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}
export interface Cart {
  items: CartItem[];
  totalPrice: number;
}
export interface AddCartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}
export const OrderStatus = {
  Pending: 0,
  Processing: 1,
  Shipped: 2,
  Completed: 3,
  Cancelled: 4,
} as const;
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];
export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}
export interface Order {
  id: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
}
export interface CreateOrder {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  items: OrderItem[];
}
export interface UpdateOrderStatus {
  status: OrderStatus;
}
