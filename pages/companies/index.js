import Link from 'next/link';
import styles from '@/styles/CompaniesList.module.css';

export default function CompaniesListPage({ companies = [] }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Companies</h1>
      <div className={styles.flex}>
        {companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          companies.map((company, ind) => (
            <div key={ind} className={styles.card}>
              <div className={styles.logoContainer}>
                <img src={company.logo} alt={`${company.companyTitle} logo`} />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h2>{company.companyTitle}</h2>
                  <span className={styles.rating}>⭐ {company.rating}</span>
                </div>
                <p className={styles.location}>{company.location}</p>

                <div className={styles.cardFooter}>
                  <Link href={`/companies/${company._id}`} className={styles.exploreBtn}>
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/companies');
    const data = await res.json();
    return { props: { companies: data.companies || [] } };
  } catch (error) {
    console.error('Failed to fetch companies:', error);
    return { props: { companies: [] } };
  }
}
