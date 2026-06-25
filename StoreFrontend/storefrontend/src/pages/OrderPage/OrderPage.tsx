import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useOrdersByEmail } from '../../hooks/useOrders';
import { OrderStatus } from '../../types';
import styles from './OrderPage.module.css';
const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: 'Pending',
  [OrderStatus.Processing]: 'Processing',
  [OrderStatus.Shipped]: 'Shipped',
  [OrderStatus.Completed]: 'Completed',
  [OrderStatus.Cancelled]: 'Cancelled',
};
const STATUS_CSS: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: styles.statusPending ?? '',
  [OrderStatus.Processing]: styles.statusProcessing ?? '',
  [OrderStatus.Shipped]: styles.statusShipped ?? '',
  [OrderStatus.Completed]: styles.statusDelivered ?? '',
  [OrderStatus.Cancelled]: styles.statusCancelled ?? '',
};
function OrderPage() {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { data: orders, isLoading, isError } = useOrdersByEmail(submittedEmail);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedEmail(email.trim());
  };
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Your Orders</h1>
          <div className={styles.userProfile}>Customer</div>
        </header>
        <div className={styles.content}>
          <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder="Enter your email to find orders"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <button type="submit">Search</button>
          </form>
          {submittedEmail && (
            <>
              {isLoading ? (
                <div>Loading orders...</div>
              ) : isError ? (
                <div>Error loading orders.</div>
              ) : orders?.length === 0 ? (
                <div>No orders found for {submittedEmail}.</div>
              ) : (
                <div className={styles.orderList}>
                  {orders?.map((order) => (
                    <div key={order.id} className={styles.orderItem}>
                      <div className={styles.orderDetails}>
                        <h3>Order #{order.id}</h3>
                        <p className={styles.orderDate}>
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>
                          {order.items.length} item(s) — {order.customerName}
                        </p>
                      </div>
                      <div className={`${styles.orderStatus} ${STATUS_CSS[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </div>
                      <div className={styles.orderTotal}>
                        ${order.items
                          .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
export default OrderPage;
