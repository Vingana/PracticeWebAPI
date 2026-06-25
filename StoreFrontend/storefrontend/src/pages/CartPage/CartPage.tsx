import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useCart, useUpdateCartQuantity, useRemoveFromCart, useClearCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { ValidationErrors } from '../../components/ValidationErrors/ValidationErrors';
import styles from './CartPage.module.css';
function CartPage() {
  const navigate = useNavigate();
  const { data: cart, isLoading: isCartLoading, isError: isCartError } = useCart();
  const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useProducts();
  const updateQuantity = useUpdateCartQuantity();
  const removeItem = useRemoveFromCart();
  const clearCart = useClearCart();
  const isLoading = isCartLoading || isProductsLoading;
  const isError = isCartError || isProductsError;
  const stockErrors = cart?.items
    .map((item) => {
      const product = products?.find((p) => p.id === item.productId);
      if (product && item.quantity > product.quantity) {
        return `Requested quantity for "${item.productName}" (${item.quantity}) exceeds available stock (${product.quantity}).`;
      }
      return null;
    })
    .filter((msg): msg is string => msg !== null) ?? [];
  const hasStockErrors = stockErrors.length > 0;
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Your Cart</h1>
          <div className={styles.userProfile}>Customer</div>
        </header>
        <div className={styles.content}>
          {isLoading ? (
            <div>Loading cart and stock info...</div>
          ) : isError ? (
            <div>Error loading cart. Please make sure the backend API is running.</div>
          ) : (
            <div className={styles.cartContainer}>
              <div className={styles.cartItems}>
                <h2>Cart Items</h2>
                {}
                <ValidationErrors errors={stockErrors} />
                {cart?.items.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cart?.items.map((item) => {
                    const product = products?.find((p) => p.id === item.productId);
                    const stockLimit = product ? product.quantity : 0;
                    const exceedsStock = item.quantity > stockLimit;
                    return (
                      <div
                        key={item.productId}
                        className={styles.item}
                        style={{
                          borderLeft: exceedsStock ? '4px solid #ef4444' : undefined,
                          background: exceedsStock ? '#fff8f8' : undefined,
                        }}
                      >
                        <div className={styles.itemDetails}>
                          <h3>{item.productName}</h3>
                          <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                          {product && (
                            <span style={{ fontSize: '0.8rem', color: exceedsStock ? '#b91c1c' : '#666', display: 'block', marginTop: '4px' }}>
                              In Stock: {product.quantity}
                            </span>
                          )}
                        </div>
                        <div className={styles.itemQuantity}>
                          <button
                            onClick={() =>
                              updateQuantity.mutate({
                                productId: item.productId,
                                quantity: item.quantity - 1,
                              })
                            }
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span>Qty: {item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity.mutate({
                                productId: item.productId,
                                quantity: item.quantity + 1,
                              })
                            }
                            disabled={item.quantity >= stockLimit}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem.mutate(item.productId)}
                            className={styles.removeBtn}
                            title="Remove item"
                            aria-label={`Remove ${item.productName} from cart`}
                          >
                            🗑 Remove
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
                {(cart?.items.length ?? 0) > 0 && (
                  <button
                    onClick={() => clearCart.mutate()}
                    style={{ marginTop: '12px' }}
                  >
                    Clear Cart
                  </button>
                )}
              </div>
              <div className={styles.orderSummary}>
                <h2>Order Summary</h2>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${(cart?.totalPrice ?? 0).toFixed(2)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Total</span>
                  <span>${(cart?.totalPrice ?? 0).toFixed(2)}</span>
                </div>
                <button
                  className={styles.checkoutBtn}
                  onClick={() => navigate('/checkout')}
                  disabled={(cart?.items.length ?? 0) === 0 || hasStockErrors}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default CartPage;
