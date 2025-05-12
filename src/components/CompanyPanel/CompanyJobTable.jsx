import React from 'react';
import DeleteButton from './DeleteButton';
import CloseToggle from './CloseToggle';
import EditModal from './EditModal';
import JobCard from '../jobCard';
import styles from '@/src/styles/CompanyJobTable.module.css';

export default function CompanyJobTable({ jobs }) {
  return (
    <div className={styles.gridContainer}>
      {jobs.map((job) => (
        <div key={job._id} className={styles.cardWrapper}>
          <JobCard job={job} basePath="/company/jobs" />
          <div className={styles.actionRow}>
            <EditModal job={job} />
            <CloseToggle jobId={job._id} isOpen={job.isOpen} />
            <DeleteButton jobId={job._id} />
          </div>
        </div>
      ))}
    </div>
  );
}
