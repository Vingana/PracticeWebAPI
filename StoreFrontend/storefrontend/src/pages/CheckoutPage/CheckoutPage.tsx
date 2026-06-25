import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { ValidationErrors } from '../../components/ValidationErrors/ValidationErrors';
import { useCart } from '../../hooks/useCart';
import { useCreateOrder } from '../../hooks/useOrders';
import { extractValidationErrors, extractFieldErrors } from '../../utils/validationErrors';
import styles from './CheckoutPage.module.css';
function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cart } = useCart();
  const createOrder = useCreateOrder();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [bannerErrors, setBannerErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const getFieldError = (field: string) => fieldErrors[field]?.[0];
  const handlePlaceOrder = async (e: FormEvent) => {
    e.preventDefault();
    setBannerErrors([]);
    setFieldErrors({});
    if (!cart || cart.items.length === 0) {
      setBannerErrors(['Your cart is empty. Please add items before checking out.']);
      return;
    }
    createOrder.mutate(
      {
        customerName,
        phone,
        email,
        address,
        items: cart.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      },
      {
        onSuccess: () => navigate('/order'),
        onError: (err) => {
          setBannerErrors(extractValidationErrors(err));
          setFieldErrors(extractFieldErrors(err));
        },
      }
    );
  };
  const inputStyle = (field: string): React.CSSProperties => ({
    border: getFieldError(field) ? '1.5px solid #ef4444' : undefined,
    outline: getFieldError(field) ? 'none' : undefined,
  });
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Checkout</h1>
          <div className={styles.userProfile}>Customer</div>
        </header>
        <div className={styles.content}>
          <div className={styles.checkoutLayout}>
            <form className={styles.checkoutForm} onSubmit={handlePlaceOrder}>
              <h2>Shipping Information</h2>
              {}
              <ValidationErrors errors={bannerErrors} />
              <div className={styles.formGroup}>
                <label htmlFor="customerName">Full Name</label>
                <input
                  id="customerName"
                  type="text"
                  placeholder="John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  style={inputStyle('customername')}
                />
                {getFieldError('customername') && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                    {getFieldError('customername')}
                  </span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={inputStyle('phone')}
                />
                {getFieldError('phone') && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                    {getFieldError('phone')}
                  </span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle('email')}
                />
                {getFieldError('email') && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                    {getFieldError('email')}
                  </span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">Delivery Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="123 Main St, New York, NY 10001"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  style={inputStyle('address')}
                />
                {getFieldError('address') && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>
                    {getFieldError('address')}
                  </span>
                )}
              </div>
              <div className={styles.orderSummary}>
                <h2>Order Summary</h2>
                {cart?.items.map((item) => (
                  <div key={item.productId} className={styles.summaryRow}>
                    <span>{item.productName} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Total</span>
                  <span>${(cart?.totalPrice ?? 0).toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className={styles.placeOrderBtn}
                  disabled={createOrder.isPending || !cart || cart.items.length === 0}
                >
                  {createOrder.isPending ? 'Placing Order…' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
export default CheckoutPage;
