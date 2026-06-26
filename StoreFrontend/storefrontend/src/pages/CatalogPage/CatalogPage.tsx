import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useAddToCart, useCart } from '../../hooks/useCart';
import Toast from '../../components/Toast/Toast';
import PageLayout from '../../components/PageLayout/PageLayout';
import styles from './CatalogPage.module.css';
function CatalogPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const { data: products, isLoading, isError } = useProducts(search || undefined, categoryId);
  const { data: categories } = useCategories();
  const { data: cart } = useCart();
  const addToCart = useAddToCart();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const getCartQuantity = (productId: number) => {
    return cart?.items.find((i) => i.productId === productId)?.quantity ?? 0;
  };

  return (
    <PageLayout title="Product Catalog">
      {/* Filter controls */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', flex: 1, minWidth: '180px' }}
        />
        <select
          value={categoryId ?? ''}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div>Loading products...</div>
      ) : isError ? (
        <div>Error loading products. Please make sure the backend API is running.</div>
      ) : (
        <div className={styles.productGrid}>
          {products?.map((product) => {
            const inCart = getCartQuantity(product.id);
            const available = product.quantity - inCart;
            return (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.productImagePlaceholder}>
                  {product.imageURL ? (
                    <img src={product.imageURL} alt={product.name} style={{ maxWidth: '100%' }} />
                  ) : (
                    'No Image'
                  )}
                </div>
                <h3>{product.name}</h3>
                <p style={{ fontSize: '0.8rem', color: '#888', margin: '4px 0' }}>{product.categoryName}</p>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                <p style={{ fontSize: '0.8rem', color: product.quantity > 0 ? '#888' : '#ef4444', margin: '0 0 12px 0' }}>
                  {product.quantity > 0 ? `In stock: ${product.quantity}` : 'Out of stock'}
                </p>
                <button
                  className={styles.addToCartBtn}
                  disabled={addToCart.isPending || product.quantity === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (available <= 0) {
                      setToast({ message: `Not enough stock for "${product.name}". Already ${inCart} in cart.`, type: 'error' });
                      return;
                    }
                    addToCart.mutate(
                      {
                        productId: product.id,
                        productName: product.name,
                        price: product.price,
                        quantity: 1,
                      },
                      {
                        onSuccess: () => setToast({ message: `"${product.name}" added to cart!`, type: 'success' }),
                      }
                    );
                  }}
                >
                  {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            );
          })}
        </div>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </PageLayout>
  );
}

export default CatalogPage;
