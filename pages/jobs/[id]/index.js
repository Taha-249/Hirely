import styles from '@/styles/JobDetail.module.css';

export default function JobDetails({ job, error }) {
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!job) {
    return <div className={styles.notFound}>Job not found.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{job.title}</h1>
      <p className={styles.company}>{job.company} • {job.location}</p>

      {!job.isOpen && <span className={styles.closed}>This position is closed</span>}

      <div className={styles.details}>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
      </div>

      <div className={styles.description}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sagittis nulla. Pellentesque habitant morbi tristique senectus.</p>
        <p>Responsibilities include:</p>
        <ul>
          <li>Building and maintaining frontend applications</li>
          <li>Collaborating with cross-functional teams</li>
          <li>Ensuring UI/UX consistency</li>
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
    const job = await res.json();
    
    if (!job) {
      return { props: { job: null } };
    }

    return { props: { job } };
  } catch (error) {
    return {
      props: {
        job: null,
        error: 'Failed to load job.',
      },
    };
  }
}
