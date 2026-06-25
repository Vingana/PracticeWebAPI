import { createBrowserRouter } from 'react-router-dom';
import AdminPage from '../pages/AdminPage/AdminPage';
import App from '../App';
import CartPage from '../pages/CartPage/CartPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import ProductPage from '../pages/ProductPage/ProductPage';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/catalog',
    element: <CatalogPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/order',
    element: <OrderPage />,
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
  },
]);
