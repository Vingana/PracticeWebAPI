import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const [open, setOpen] = useState(false);
  return (
    <>
      {}
      <button
        className={styles.hamburger}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span className={open ? styles.barTop : styles.bar} />
        <span className={open ? styles.barMid : styles.bar} />
        <span className={open ? styles.barBot : styles.bar} />
      </button>
      {}
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <h2 className={styles.brand}>StoreFront</h2>
        <nav className={styles.nav}>
          <ul>
            <li className={path === '/catalog' ? styles.active : ''}>
              <Link to="/catalog" onClick={() => setOpen(false)}>Catalog</Link>
            </li>
            <li className={path === '/cart' ? styles.active : ''}>
              <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>
            </li>
            <li className={path === '/order' ? styles.active : ''}>
              <Link to="/order" onClick={() => setOpen(false)}>Orders</Link>
            </li>
            <li className={path === '/admin' ? styles.active : ''}>
              <Link to="/admin" onClick={() => setOpen(false)}>Admin</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
export default Navbar;
