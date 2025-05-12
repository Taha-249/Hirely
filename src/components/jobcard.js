import { useRouter } from 'next/router';
import styles from './jobCard.module.css';

export default function JobCard({ job, basePath = '/jobs' }) {
  const router = useRouter();

  return (
    <div key={job._id} className={styles.card}>
      <div className={styles.header}>
        <div className={styles.jobTitle}>
          <h2>{job.title}</h2>
          <p>{job.companyTitle}</p>
        </div>

        <div className={styles.jobTypeAndSalary}>
          <p>{job.jobType}</p>
          <p>{job.salary}</p>
        </div>
      </div>

      <div className={styles.tags}>
        <span className={styles.tag}>{job.category}</span>
      </div>

      <hr className={styles.separator} />

      <div className={styles.jobMessage}>
        <p>{job.message}</p>
      </div>

      <div className={styles['button-container']}>
        <button
          className={styles.button}
          onClick={() => router.push(`${basePath}/${job._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
