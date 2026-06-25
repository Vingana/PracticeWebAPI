import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useProduct } from '../../hooks/useProducts';
import { useAddToCart } from '../../hooks/useCart';
import { useState } from 'react';
import styles from './ProductPage.module.css';
function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const { data: product, isLoading, isError } = useProduct(productId);
  const addToCart = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    if (!product) return;
    addToCart.mutate(
      {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
      },
      {
        onSuccess: () => navigate('/cart'),
      }
    );
  };
  return (
    <div className={styles.pageContainer}>
      <Navbar />
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
                  <img src={product.imageURL} alt={product.name} style={{ maxWidth: '100%' }} />
                ) : (
                  'No Image'
                )}
              </div>
              <div className={styles.productInfo}>
                <h2>{product.name}</h2>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                <p style={{ fontSize: '0.85rem', color: '#888' }}>
                  Category: {product.categoryName}
                </p>
                {product.description && (
                  <p className={styles.productDescription}>{product.description}</p>
                )}
                <p style={{ fontSize: '0.85rem' }}>
                  In stock: {product.quantity}
                </p>
                <div className={styles.actions}>
                  <div className={styles.quantitySelector}>
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
                      disabled={quantity >= product.quantity}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                    disabled={addToCart.isPending || product.quantity === 0}
                  >
                    {addToCart.isPending ? 'Adding…' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default ProductPage;
