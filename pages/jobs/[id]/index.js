import { useState } from "react";
import styles from "@/styles/JobDetail.module.css";

export default function JobDetails({ job, error }) {
  const [showDescription, setShowDescription] = useState(true); // Toggle between description and details

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!job) {
    return <div className={styles.notFound}>Job not found.</div>;
  }

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.LeftSideBar}></div>
      <div className={styles.CentreContent}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{job.title}</h1>
            <p className={styles.company}>
              {job.company} • {job.location}
            </p>

            <div className={styles.headerRight}>
              <span className={styles.jobType}>{job.jobType}</span>
              <span className={styles.salary}>{job.salary}</span>
            </div>
          </div>

          <div className={styles.tags}>
            {job.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <hr className={styles.divider} />

          <div className={styles.jobInfo}>
            <p>
              <strong>Category:</strong> {job.category}
            </p>
            <p>
              <strong>Work Mode:</strong> {job.workMode}
            </p>
            <p>
              <strong>Experience Level:</strong> {job.expLevel}
            </p>

            {!job.isOpen ? (
              <span className={styles.status}>Closed</span>
            ) : (
              <div className={styles.toggleButtons}>
                <button onClick={() => {}} className={styles.toggleButton}>
                  Apply Now
                </button>
              </div>
            )}
          </div>

          <div className={styles.buttonOptions}>
            <div className={`${styles.toggleButton} ${showDescription ? styles.selectedButton : ''}`}>
              <button
                onClick={() => {
                  setShowDescription(true);
                }}
                className={styles.toggleButton}
              >
                {"Show Description"}
              </button>
            </div>
             <div className={`${styles.toggleButton} ${!showDescription ? styles.selectedButton : ''}`}>
              <button
                onClick={() => {
                  setShowDescription(false);
                }}
                className={styles.toggleButton}
              >
                {"Show Details"}
              </button>
            </div>
          </div>

          {showDescription ? (
            <div className={styles.description}>
              <p>
                <strong>Job Description:</strong>
              </p>
              <p>{job.description || "No description available."}</p>
            </div>
          ) : (
            <div className={styles.details}>
              <p>
                <strong>Job Details:</strong>
              </p>
              <p>{job.details || "No details available."}</p>
            </div>
          )}
        </div>
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
        error: "Failed to load job.",
      },
    };
  }
}
