import Link from 'next/link';
import JobCard from '@/src/components/jobCard';
import styles from '@/styles/CompanyDashboard.module.css';

export default function CompanyDashboard({ jobs }) {
  const recentJobs = jobs.slice(0, 3); // show only 3 jobs

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Company Dashboard</h1>

      <div className={styles.actions}>
        <Link href="/jobs/new">
          <button className={styles.button}>Post a Job</button>
        </Link>
        <Link href="/company/jobs">
          <button className={styles.button}>View All Jobs</button>
        </Link>
      </div>

      <h2 className={styles.subtitle}>Recent Job Posts</h2>
      <div className={styles.grid}>
        {recentJobs.length > 0 ? (
          recentJobs.map((job) => (
            <JobCard key={job._id} job={job} basePath="/company/jobs" />
          ))
        ) : (
          <p className={styles.noJobs}>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/jobs');
    const jobs = await res.json();
    return {
      props: { jobs },
    };
  } catch (error) {
    console.error('Error loading jobs:', error);
    return {
      props: { jobs: [] },
    };
  }
}
