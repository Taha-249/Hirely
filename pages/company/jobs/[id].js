import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import JobDetailCard from '@/src/components/CompanyPanel/JobDetailCard';
import styles from '@/styles/JobDetail.module.css';

export default function CompanyJobDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load job');
      });
  }, [id]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!job) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Job Details</h1>
      <JobDetailCard job={job} />
    </div>
  );
}
