import { useRouter } from 'next/router';
import styles from './jobcard.module.css';

export default function JobCard({ job }) {
    const router = useRouter();
  return (
    <div key={job._id} className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2>{job.title}</h2>
          <p>{job.company} • {job.location}</p>
        </div>
        {!job.isOpen && <span className={styles.status}>Closed</span>}
      </div>

      <div className={styles.details}>
        <p>Category: {job.category}</p>
        <p>Salary: {job.salary}</p>
      </div>

      <div className={styles['button-container']}>
        <button className={styles.button} onClick={()=>{router.push(`/jobs/${job._id}`)}}>
          View Details
        </button>
      </div>
    </div>
  );
}
