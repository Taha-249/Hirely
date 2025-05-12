import useSWR from 'swr';
import JobCard from '@/src/components/jobCard';
import styles from '@/styles/CompanyJobPage.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CompanyJobsPage() {
  const { data: jobs, error, isLoading } = useSWR('/api/jobs/company', fetcher, {
    refreshInterval: 5000,
  });

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div>Failed to load jobs</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Job Posts</h1>
      <div className={styles.grid}>
        {jobs?.map((job) => (
          <JobCard key={job._id} job={job} basePath="/company/jobs" />
        ))}
      </div>
    </div>
  );
}
