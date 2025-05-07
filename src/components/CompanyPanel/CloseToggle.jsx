import React from 'react';
import styles from './EditModal.module.css'; 
export default function CloseToggle({ jobId, isOpen }) {
  const toggleStatus = async () => {
    await fetch(`/api/jobs/${jobId}/close`, { method: 'PATCH' });
    window.location.reload();
  };

  return (
    <>
    <div className={styles['button-container']}>
    <button onClick={toggleStatus} className={styles.button}>
      {isOpen ? 'Close' : 'Reopen'}
    </button>
        
      </div>
   
    </>
    
  );
}