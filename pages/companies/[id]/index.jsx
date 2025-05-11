// pages/companies/[id].js
import Link from 'next/link';
import styles from '@/styles/CompanyDetail.module.css';

export default function CompanyDetailPage({ company }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{company.name}</h1>
      <p className={styles.info}><strong>Industry:</strong> {company.industry}</p>
      <p className={styles.info}><strong>Location:</strong> {company.location}</p>
      <p className={styles.info}><strong>Description:</strong> {company.description}</p>
      
      <Link href={`/companies/${company.id}/jobs`}>
        <button className={styles.button}>View Jobs</button>
      </Link>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/companies/${params.id}`);
  const company = await res.json();
  return { props: { company } };
}
