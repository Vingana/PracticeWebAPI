import { useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import Toast from '../../components/Toast/Toast';
import { useProduct } from '../../hooks/useProducts';
import { useAddToCart, useCart } from '../../hooks/useCart';
import { useState } from 'react';
import styles from './ProductPage.module.css';
function ProductPage() {
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, isLoading, isError } = useProduct(productId);
  const { data: cart } = useCart();
  const addToCart = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const inCart = cart?.items.find((i) => i.productId === productId)?.quantity ?? 0;
  const available = (product?.quantity ?? 0) - inCart;

  const handleAddToCart = () => {
    if (!product) return;
    if (quantity > available) {
      setToast({ message: `Not enough stock. Only ${available} left (${inCart} already in cart).`, type: 'error' });
      return;
    }
    addToCart.mutate(
      {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
      },
      {
        onSuccess: () => setToast({ message: `"${product.name}" added to cart!`, type: 'success' }),
      }
    );
  };
  return (
  <PageLayout title={product?.name ?? "Product Details"}>
    <main className={styles.mainContent}>
      <header className={styles.header}>
        <h1>Product Details</h1>
        <div className={styles.userProfile}>Customer</div>
      </header>
      <div className={styles.content}>
        {isLoading ? (
          <div>Loading product...</div>
        ) : isError || !product ? (
          <div>Product not found.</div>
        ) : (
          <div className={styles.productLayout}>
            <div className={styles.productImage}>
              {product.imageURL ? (
                <img src={product.imageURL} alt={product.name} style={{ maxWidth: "100%" }} />
              ) : (
                "No Image"
              )}
            </div>
            <div className={styles.productInfo}>
              <h2>{product.name}</h2>
              <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
              <p style={{ fontSize: "0.85rem", color: "#888" }}>
                Category: {product.categoryName}
              </p>
              {product.description && (
                <p className={styles.productDescription}>{product.description}</p>
              )}
              <p style={{ fontSize: "0.85rem" }}>
                In stock: {product.quantity}{inCart > 0 && ` (${inCart} in cart)`}
              </p>
              <div className={styles.actions}>
                {available > 0 && (
                  <div className={styles.quantitySelector}>
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(available, q + 1))} disabled={quantity >= available}>+</button>
                  </div>
                )}
                <button
                  className={styles.addToCartBtn}
                  onClick={handleAddToCart}
                  disabled={addToCart.isPending || available <= 0}
                >
                  {available <= 0
                    ? "Out of Stock"
                    : addToCart.isPending
                    ? "Adding…"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
  </PageLayout>
);

}
export default ProductPage;
