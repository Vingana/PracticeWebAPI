import React, { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.userProfile}>Customer</div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

export default PageLayout;
