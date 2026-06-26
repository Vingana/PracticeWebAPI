import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useOrders, useUpdateOrderStatus } from '../../hooks/useOrders';
import { useProducts, useCreateProduct, useDeleteProduct, useUpdateProduct } from '../../hooks/useProducts';
import { useCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '../../hooks/useCategories';
import { OrderStatus } from '../../types';
import { ValidationErrors } from '../../components/ValidationErrors/ValidationErrors';
import { extractValidationErrors } from '../../utils/validationErrors';
import styles from './AdminPage.module.css';
const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: 'Pending',
  [OrderStatus.Processing]: 'Processing',
  [OrderStatus.Shipped]: 'Shipped',
  [OrderStatus.Completed]: 'Completed',
  [OrderStatus.Cancelled]: 'Cancelled',
};
type Tab = 'overview' | 'orders' | 'products' | 'categories';
function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('overview');
  const { data: orders } = useOrders();
  const { data: products } = useProducts();
  const { data: categories } = useCategories();
  const updateStatus = useUpdateOrderStatus();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const updateCategory = useUpdateCategory();
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: 0, quantity: 0, categoryId: 0, imageURL: '',
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [orderErrors, setOrderErrors] = useState<string[]>([]);
  const [productErrors, setProductErrors] = useState<string[]>([]);
  const [categoryErrors, setCategoryErrors] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<null | {
    id: number; name: string; description: string; price: number; quantity: number; categoryId: number; imageURL: string;
  }>(null);
  const [editErrors, setEditErrors] = useState<string[]>([]);
  const [editingCategory, setEditingCategory] = useState<null | { id: number; name: string }>(null);
  const [editCategoryErrors, setEditCategoryErrors] = useState<string[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const toggleOrder = (id: number) =>
    setExpandedOrderId((prev) => (prev === id ? null : id));
  const totalRevenue = orders
    ?.flatMap((o) => o.items)
    .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) ?? 0;
  return (
    <div className={styles.adminContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Dashboard Overview</h1>
          <div className={styles.userProfile}>Admin User</div>
        </header>
        {}
        <div style={{ display: 'flex', gap: '12px', padding: '0 24px', borderBottom: '1px solid #eee', marginBottom: '0' }}>
          {(['overview', 'orders', 'products', 'categories'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '10px 16px',
                background: 'none',
                border: 'none',
                borderBottom: tab === t ? '2px solid #6c63ff' : '2px solid transparent',
                fontWeight: tab === t ? 700 : 400,
                cursor: 'pointer',
                textTransform: 'capitalize',
                color: tab === t ? '#6c63ff' : '#555',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className={styles.content}>
          {}
          {tab === 'overview' && (
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <h3>Total Products</h3>
                <p className={styles.stat}>{products?.length ?? '—'}</p>
              </div>
              <div className={styles.card}>
                <h3>Total Orders</h3>
                <p className={styles.stat}>{orders?.length ?? '—'}</p>
              </div>
              <div className={styles.card}>
                <h3>Total Revenue</h3>
                <p className={styles.stat}>${totalRevenue.toFixed(2)}</p>
              </div>
              <div className={styles.card}>
                <h3>Categories</h3>
                <p className={styles.stat}>{categories?.length ?? '—'}</p>
              </div>
            </div>
          )}
          {}
          {tab === 'orders' && (
            <div>
              <h2>All Orders</h2>
              <ValidationErrors errors={orderErrors} />
              {orders?.length === 0 && <p>No orders yet.</p>}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee', background: '#f8f9ff' }}>
                    <th style={{ padding: '10px 8px', fontWeight: 600 }}></th>
                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>ID</th>
                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>Customer</th>
                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>Email</th>
                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>Total</th>
                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    const total = order.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
                    return (
                      <>
                        {}
                        <tr
                          key={order.id}
                          onClick={() => toggleOrder(order.id)}
                          style={{
                            borderBottom: isExpanded ? 'none' : '1px solid #f0f0f0',
                            cursor: 'pointer',
                            background: isExpanded ? '#f0f4ff' : 'transparent',
                            transition: 'background 0.15s',
                          }}
                        >
                          <td style={{ padding: '10px 8px', color: '#6c63ff', fontSize: '0.85rem', userSelect: 'none' }}>
                            {isExpanded ? '▲' : '▼'}
                          </td>
                          <td style={{ padding: '10px 8px', fontWeight: 600 }}>#{order.id}</td>
                          <td style={{ padding: '10px 8px' }}>{order.customerName}</td>
                          <td style={{ padding: '10px 8px', color: '#888', fontSize: '0.9rem' }}>{order.email}</td>
                          <td style={{ padding: '10px 8px', color: '#888', fontSize: '0.9rem' }}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '3px 10px',
                              borderRadius: '20px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              background:
                                order.status === 4 ? '#fee2e2' :
                                order.status === 3 ? '#d1fae5' :
                                order.status === 2 ? '#dbeafe' :
                                '#fef9c3',
                              color:
                                order.status === 4 ? '#b91c1c' :
                                order.status === 3 ? '#065f46' :
                                order.status === 2 ? '#1d4ed8' :
                                '#92400e',
                            }}>
                              {STATUS_LABELS[order.status]}
                            </span>
                          </td>
                          <td style={{ padding: '10px 8px', fontWeight: 700, color: '#4318FF' }}>
                            ${total.toFixed(2)}
                          </td>
                          <td style={{ padding: '10px 8px' }} onClick={(e) => e.stopPropagation()}>
                            <select
                              value={order.status}
                              onChange={(e) => {
                                setOrderErrors([]);
                                updateStatus.mutate(
                                  { id: order.id, dto: { status: Number(e.target.value) as OrderStatus } },
                                  { onError: (err) => setOrderErrors(extractValidationErrors(err)) }
                                );
                              }}
                              style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e0e5f2', cursor: 'pointer' }}
                            >
                              {Object.entries(STATUS_LABELS).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        {}
                        {isExpanded && (
                          <tr key={`${order.id}-detail`} style={{ background: '#f8f9ff', borderBottom: '2px solid #e0e5ff' }}>
                            <td colSpan={8} style={{ padding: '0 16px 16px 40px' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start' }}>
                                {}
                                <div>
                                  <p style={{ fontWeight: 700, marginBottom: '8px', color: '#2b3674', fontSize: '0.9rem' }}>Ordered Items</p>
                                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                                    <thead>
                                      <tr style={{ background: '#ededff', textAlign: 'left' }}>
                                        <th style={{ padding: '6px 10px', fontWeight: 600 }}>Product</th>
                                        <th style={{ padding: '6px 10px', fontWeight: 600, textAlign: 'right' }}>Qty</th>
                                        <th style={{ padding: '6px 10px', fontWeight: 600, textAlign: 'right' }}>Unit Price</th>
                                        <th style={{ padding: '6px 10px', fontWeight: 600, textAlign: 'right' }}>Subtotal</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {order.items.map((item) => (
                                        <tr key={item.productId} style={{ borderBottom: '1px solid #e9ecf7' }}>
                                          <td style={{ padding: '6px 10px' }}>{item.productName}</td>
                                          <td style={{ padding: '6px 10px', textAlign: 'right' }}>{item.quantity}</td>
                                          <td style={{ padding: '6px 10px', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                                          <td style={{ padding: '6px 10px', textAlign: 'right', fontWeight: 600 }}>
                                            ${(item.unitPrice * item.quantity).toFixed(2)}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot>
                                      <tr style={{ borderTop: '2px solid #c7d2fe' }}>
                                        <td colSpan={3} style={{ padding: '6px 10px', fontWeight: 700, textAlign: 'right' }}>Total</td>
                                        <td style={{ padding: '6px 10px', fontWeight: 700, color: '#4318FF', textAlign: 'right' }}>
                                          ${total.toFixed(2)}
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                                {}
                                <div style={{ minWidth: '200px', background: '#fff', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontSize: '0.85rem' }}>
                                  <p style={{ fontWeight: 700, marginBottom: '10px', color: '#2b3674' }}>Contact</p>
                                  <p style={{ margin: '4px 0', color: '#555' }}>📞 {order.phone}</p>
                                  <p style={{ margin: '4px 0', color: '#555' }}>✉️ {order.email}</p>
                                  <p style={{ margin: '12px 0 4px 0', fontWeight: 700, color: '#2b3674' }}>Delivery Address</p>
                                  <p style={{ margin: '4px 0', color: '#555' }}>📍 {order.address}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {}
          {tab === 'products' && (
            <div>
              <h2>Products</h2>
              <ValidationErrors errors={productErrors} />
              <form
                style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', alignItems: 'flex-end' }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setProductErrors([]);
                  createProduct.mutate(
                    { ...newProduct, imageURL: newProduct.imageURL || undefined },
                    {
                      onSuccess: () => setNewProduct({ name: '', description: '', price: 0, quantity: 0, categoryId: 0, imageURL: '' }),
                      onError: (err) => {
                        setProductErrors(extractValidationErrors(err));
                      },
                    }
                  );
                }}
              >
                <input placeholder="Name" required value={newProduct.name}
                  onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <input placeholder="Description" value={newProduct.description}
                  onChange={(e) => setNewProduct((p) => ({ ...p, description: e.target.value }))}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <input placeholder="Price" type="number" min={0} step="0.01" required value={newProduct.price || ''}
                  onChange={(e) => setNewProduct((p) => ({ ...p, price: Number(e.target.value) }))}
                  style={{ width: '90px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <input placeholder="Qty" type="number" min={0} required value={newProduct.quantity || ''}
                  onChange={(e) => setNewProduct((p) => ({ ...p, quantity: Number(e.target.value) }))}
                  style={{ width: '70px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <select required value={newProduct.categoryId || ''}
                  onChange={(e) => setNewProduct((p) => ({ ...p, categoryId: Number(e.target.value) }))}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}>
                  <option value="">Category</option>
                  {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input placeholder="Image URL (optional)" value={newProduct.imageURL}
                  onChange={(e) => setNewProduct((p) => ({ ...p, imageURL: e.target.value }))}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <button type="submit" disabled={createProduct.isPending}
                  style={{ padding: '6px 14px', borderRadius: '6px', background: '#6c63ff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                  Add Product
                </button>
              </form>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '8px' }}>ID</th>
                    <th style={{ padding: '8px' }}>Name</th>
                    <th style={{ padding: '8px' }}>Category</th>
                    <th style={{ padding: '8px' }}>Price</th>
                    <th style={{ padding: '8px' }}>Qty</th>
                    <th style={{ padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '8px' }}>{p.id}</td>
                      <td style={{ padding: '8px' }}>{p.name}</td>
                      <td style={{ padding: '8px' }}>{p.categoryName}</td>
                      <td style={{ padding: '8px' }}>${p.price.toFixed(2)}</td>
                      <td style={{ padding: '8px' }}>{p.quantity}</td>
                      <td style={{ padding: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => setEditingProduct({
                            id: p.id,
                            name: p.name,
                            description: p.description ?? '',
                            price: p.price,
                            quantity: p.quantity,
                            categoryId: p.categoryId,
                            imageURL: p.imageURL ?? '',
                          })}
                          style={{ color: '#6c63ff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteProduct.mutate(p.id)}
                          disabled={deleteProduct.isPending}
                          style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Edit Product Modal */}
          {editingProduct && (
            <div style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            }}
              onClick={() => { setEditingProduct(null); setEditErrors([]); }}
            >
              <div
                style={{
                  background: '#fff', borderRadius: '14px', padding: '32px 28px',
                  width: '100%', maxWidth: '500px', boxShadow: '0 8px 32px rgba(108,99,255,0.18)',
                  position: 'relative',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => { setEditingProduct(null); setEditErrors([]); }}
                  style={{ position: 'absolute', top: '14px', right: '18px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#aaa' }}
                >✕</button>
                <h2 style={{ marginBottom: '20px', color: '#2b3674', fontSize: '1.2rem' }}>Edit Product #{editingProduct.id}</h2>
                {editErrors.length > 0 && (
                  <ul style={{ color: 'red', marginBottom: '12px', paddingLeft: '18px', fontSize: '0.875rem' }}>
                    {editErrors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                )}
                <form
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    setEditErrors([]);
                    updateProduct.mutate(
                      {
                        id: editingProduct.id,
                        dto: {
                          name: editingProduct.name,
                          description: editingProduct.description || undefined,
                          price: editingProduct.price,
                          quantity: editingProduct.quantity,
                          categoryId: editingProduct.categoryId,
                          imageURL: editingProduct.imageURL || undefined,
                        },
                      },
                      {
                        onSuccess: () => { setEditingProduct(null); setEditErrors([]); },
                        onError: (err) => setEditErrors(extractValidationErrors(err)),
                      }
                    );
                  }}
                >
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.875rem', color: '#555', fontWeight: 600 }}>
                    Name
                    <input required value={editingProduct.name}
                      onChange={(e) => setEditingProduct((p) => p && ({ ...p, name: e.target.value }))}
                      style={{ padding: '8px 10px', borderRadius: '7px', border: '1px solid #d0d5e8', fontSize: '0.95rem' }} />
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.875rem', color: '#555', fontWeight: 600 }}>
                    Description
                    <textarea value={editingProduct.description} rows={3}
                      onChange={(e) => setEditingProduct((p) => p && ({ ...p, description: e.target.value }))}
                      style={{ padding: '8px 10px', borderRadius: '7px', border: '1px solid #d0d5e8', fontSize: '0.95rem', resize: 'vertical' }} />
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.875rem', color: '#555', fontWeight: 600 }}>
                      Price ($)
                      <input required type="number" min={0} step="0.01" value={editingProduct.price}
                        onChange={(e) => setEditingProduct((p) => p && ({ ...p, price: Number(e.target.value) }))}
                        style={{ padding: '8px 10px', borderRadius: '7px', border: '1px solid #d0d5e8', fontSize: '0.95rem' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.875rem', color: '#555', fontWeight: 600 }}>
                      Quantity
                      <input required type="number" min={0} value={editingProduct.quantity}
                        onChange={(e) => setEditingProduct((p) => p && ({ ...p, quantity: Number(e.target.value) }))}
                        style={{ padding: '8px 10px', borderRadius: '7px', border: '1px solid #d0d5e8', fontSize: '0.95rem' }} />
                    </label>
                  </div>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.875rem', color: '#555', fontWeight: 600 }}>
                    Category
                    <select required value={editingProduct.categoryId}
                      onChange={(e) => setEditingProduct((p) => p && ({ ...p, categoryId: Number(e.target.value) }))}
                      style={{ padding: '8px 10px', borderRadius: '7px', border: '1px solid #d0d5e8', fontSize: '0.95rem' }}>
                      <option value="">Select category</option>
                      {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.875rem', color: '#555', fontWeight: 600 }}>
                    Image URL (optional)
                    <input value={editingProduct.imageURL}
                      onChange={(e) => setEditingProduct((p) => p && ({ ...p, imageURL: e.target.value }))}
                      style={{ padding: '8px 10px', borderRadius: '7px', border: '1px solid #d0d5e8', fontSize: '0.95rem' }} />
                  </label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <button type="submit" disabled={updateProduct.isPending}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', background: '#6c63ff', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}>
                      {updateProduct.isPending ? 'Saving…' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={() => { setEditingProduct(null); setEditErrors([]); }}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', background: '#f0f0f5', color: '#555', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {tab === 'categories' && (
            <div>
              <h2>Categories</h2>
              <ValidationErrors errors={categoryErrors} />
              <form
                style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setCategoryErrors([]);
                  createCategory.mutate(
                    { name: newCategoryName },
                    {
                      onSuccess: () => setNewCategoryName(''),
                      onError: (err) => {
                        setCategoryErrors(extractValidationErrors(err));
                      },
                    }
                  );
                }}
              >
                <input
                  placeholder="Category name"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', flex: 1 }}
                />
                <button type="submit" disabled={createCategory.isPending}
                  style={{ padding: '6px 14px', borderRadius: '6px', background: '#6c63ff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                  Add Category
                </button>
              </form>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '8px' }}>ID</th>
                    <th style={{ padding: '8px' }}>Name</th>
                    <th style={{ padding: '8px' }}>Products</th>
                    <th style={{ padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '8px' }}>{c.id}</td>
                      <td style={{ padding: '8px' }}>{c.name}</td>
                      <td style={{ padding: '8px' }}>{c.productsCount}</td>
                      <td style={{ padding: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => setEditingCategory({ id: c.id, name: c.name })}
                          style={{ color: '#6c63ff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => {
                            setCategoryErrors([]);
                            deleteCategory.mutate(c.id, {
                              onError: (err) => setCategoryErrors(extractValidationErrors(err)),
                            });
                          }}
                          disabled={deleteCategory.isPending}
                          style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Edit Category Modal */}
          {editingCategory && (
            <div style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            }}
              onClick={() => { setEditingCategory(null); setEditCategoryErrors([]); }}
            >
              <div
                style={{
                  background: '#fff', borderRadius: '14px', padding: '32px 28px',
                  width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(108,99,255,0.18)',
                  position: 'relative',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => { setEditingCategory(null); setEditCategoryErrors([]); }}
                  style={{ position: 'absolute', top: '14px', right: '18px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#aaa' }}
                >✕</button>
                <h2 style={{ marginBottom: '20px', color: '#2b3674', fontSize: '1.2rem' }}>Edit Category #{editingCategory.id}</h2>
                {editCategoryErrors.length > 0 && (
                  <ul style={{ color: 'red', marginBottom: '12px', paddingLeft: '18px', fontSize: '0.875rem' }}>
                    {editCategoryErrors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                )}
                <form
                  style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    setEditCategoryErrors([]);
                    updateCategory.mutate(
                      { id: editingCategory.id, dto: { name: editingCategory.name } },
                      {
                        onSuccess: () => { setEditingCategory(null); setEditCategoryErrors([]); },
                        onError: (err) => setEditCategoryErrors(extractValidationErrors(err)),
                      }
                    );
                  }}
                >
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.875rem', color: '#555', fontWeight: 600 }}>
                    Category Name
                    <input required value={editingCategory.name}
                      onChange={(e) => setEditingCategory((c) => c && ({ ...c, name: e.target.value }))}
                      style={{ padding: '8px 10px', borderRadius: '7px', border: '1px solid #d0d5e8', fontSize: '0.95rem' }} />
                  </label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    <button type="submit" disabled={updateCategory.isPending}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', background: '#6c63ff', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}>
                      {updateCategory.isPending ? 'Saving…' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={() => { setEditingCategory(null); setEditCategoryErrors([]); }}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', background: '#f0f0f5', color: '#555', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.adminContainer}>
        <Navbar />
        <main className={styles.mainContent} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '24px', color: '#2b3674' }}>Admin Login</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="password" 
                placeholder="Enter admin password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
                required
              />
              {authError && <p style={{ color: 'red', fontSize: '0.875rem', margin: 0 }}>{authError}</p>}
              <button type="submit" style={{ padding: '12px', borderRadius: '8px', background: '#6c63ff', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
                Login
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return <AdminDashboard />;
}

export default AdminPage;
