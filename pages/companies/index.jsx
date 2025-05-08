// pages/companies/index.js
import Link from 'next/link';
import styles from '@/styles/CompaniesList.module.css';

export default function CompaniesListPage({ companies }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Companies</h1>
      <div className={styles.grid}>
        {companies.map((company) => (
          <Link key={company.id} href={`/companies/${company.id}`} className={styles.card}>
            <div>
              <h2>{company.name}</h2>
              <p>{company.industry}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/companies');
  const companies = await res.json();
  return { props: { companies } };
}
