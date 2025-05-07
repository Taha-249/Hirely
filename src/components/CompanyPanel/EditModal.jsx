import React, { useState } from 'react';
import styles from "./EditModal.module.css";

export default function EditModal({ job }) {
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState(job.title);
  const [company, setCompany] = useState(job.company);
  const [location, setLocation] = useState(job.location);
  const [category, setCategory] = useState(job.category);
  const [salary, setSalary] = useState(job.salary);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/jobs/${job._id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, company, location, category, salary }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      setShow(false);
      window.location.reload();
    } catch (err) {
      console.error('Update failed:', err.message);
      alert('Error updating job: ' + err.message);
    }
  };

  return (
    <>
      <div className={styles['button-container']}>
        <button onClick={() => setShow(true)} className={styles.button}>
          Edit
        </button>
      </div>

      {show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Edit Job</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              placeholder="Job Title"
            />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={styles.input}
              placeholder="Company"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
              placeholder="Location"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.input}
              placeholder="Category"
            />
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className={styles.input}
              placeholder="Salary"
            />

            <div className={styles['button-container']}>
              <button onClick={handleUpdate} className={styles.button}>
                Save
              </button>
              <button onClick={() => setShow(false)} className={styles.button}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
