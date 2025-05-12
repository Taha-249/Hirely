// pages/index.js
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function LandingPage() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Welcome to <span>Hirely</span></h1>
        <p className={styles.subheading}>Looking for your dream job? You’re at the right place.<br/>Get Hired with Hirely</p>
        <Link href="/jobs" className={styles.ctaButton}>Start Exploring Jobs</Link>
      </section>

      <section className={styles.divider}></section>

      <section className={styles.companySection}>
        <h2 className={styles.companyHeading}>Are you a company looking to hire?</h2>
        <p className={styles.companySubheading}>Join Hirely and find the right talent, faster.</p>
        <Link href="/signup" className={styles.ctaSecondary}>Register Your Company</Link>
      </section>
    </main>
  );
}
