// pages/companies/[id]/jobs.js
import JobCard from '@/src/components/jobcard';
import styles from '@/styles/CompanyJobs.module.css';

export default function CompanyJobsPage({ jobs }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Jobs by This Company</h1>
      {jobs.length === 0 ? (
        <p className={styles.noJobs}>No jobs found.</p>
      ) : (
        <div className={styles.grid}>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} basePath="/jobs" />
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/companies/${params.id}/jobs`);
  const jobs = await res.json();
  return { props: { jobs } };
}
