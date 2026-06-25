import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css';
function App() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Home</h1>
          <div className={styles.userProfile}>Customer</div>
        </header>
        <div className={styles.content}>
          <div className={styles.welcomeCard}>
            <h2>Welcome to StoreFront!</h2>
            <p>
              Navigate through the sidebar to explore our product catalog, check your cart,
              view your previous orders, or manage the store through the admin panel.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
