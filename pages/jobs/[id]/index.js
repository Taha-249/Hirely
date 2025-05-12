import { useState } from "react";
import styles from "@/styles/JobDetail.module.css";
import { useUserContext } from "@/src/contexts/UserContext";
import { useRouter } from "next/router";

export default function JobDetails({ job, error }) {
  const [showDescription, setShowDescription] = useState(true); // Toggle between description and details

  function handleApplyFactory(jobId, userId) {
    return async function handleApply() {
      try {
        const response = await fetch(`/api/jobs/${jobId}/apply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, jobId }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
        } else {
          alert(data.message || "Failed to apply.");
        }
      } catch (error) {
        console.error("Application error:", error);
        alert("An error occurred. Please try again later.");
      }
    };
  }

  const { userId } = useUserContext();
  const router = useRouter();
  const { id: jobId } = router.query;

  const handleApply = handleApplyFactory(jobId, userId);

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
            <p className={styles.company}>{job.companyTitle}</p>

            <div className={styles.headerRight}>
              <span className={styles.jobType}>{job.jobType}</span>
              <span className={styles.salary}>{job.salary}</span>
            </div>
          </div>
          <div className={styles.tags}>
            <span className={styles.tag}>{job.category}</span>
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
              <strong>Work Mode:</strong> {job.work_mode}
            </p>
            <p>
              <strong>Experience Level:</strong> {job.exp_level}
            </p>

            {!job.isOpen ? (
              <span className={styles.status}>Closed</span>
            ) : (
              <div className={styles.toggleButtons}>
                <button onClick={handleApply} className={styles.toggleButton}>
                  Apply Now
                </button>
              </div>
            )}
          </div>

          <div className={styles.buttonOptions}>
            <button
              onClick={() => {
                setShowDescription(true);
              }}
              className={`${styles.toggleButton} ${
                showDescription ? styles.selectedButton : ""
              }`}
            >
              {"Show Description"}
            </button>

            <button
              onClick={() => {
                setShowDescription(false);
              }}
              className={`${styles.toggleButton} ${
                !showDescription ? styles.selectedButton : ""
              }`}
            >
              {"Show Details"}
            </button>
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
