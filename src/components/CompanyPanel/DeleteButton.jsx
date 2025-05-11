import React from 'react';
import { useRouter } from 'next/router';
import styles from './EditModal.module.css'; 

export default function DeleteButton({ jobId }) {
    const router = useRouter();
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this job?')) {
      await fetch(`/api/jobs/${jobId}/edit`, { method: 'DELETE' });
      router.push("/company/jobs")
    }
  };

  return (
    <>
    <div className={styles['button-container']}>
    <button onClick={handleDelete} className={styles.button}>
      Delete
    </button>
        
      </div>
      
   
    </>
  );
}