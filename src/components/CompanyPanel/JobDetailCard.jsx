import styles from '../jobcard.module.css'; 
import EditModal from './EditModal';
import CloseToggle from './CloseToggle';
import DeleteButton from './DeleteButton';
import styles2 from './EditModal.module.css';

export default function JobDetailCard({ job }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2>{job.title}</h2>
          <p>{job.company} • {job.location}</p>
        </div>
        {!job.isOpen && <span className={styles.status}>Closed</span>}
      </div>

      <div className={styles.details}>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Work Mode:</strong> {job.workmode}</p>
        <p><strong>Experience Level:</strong> {job.experience}</p>
       {/* <p><strong>Description:</strong> {job.description || 'No description available.'}</p>
        <p><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}</p> */}
      </div>

      <div className={`${styles2['button-container']}`}>
        <EditModal job={job} />
        <CloseToggle jobId={job._id} isOpen={job.isOpen} />
        <DeleteButton jobId={job._id} />
      </div>
    </div>
  );
}
