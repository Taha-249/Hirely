import JobCard from '@/src/components/jobcard';
import React from 'react';

export default function JobsPage({ jobs, error }){
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>All Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <>
          {jobs.map((job) => (
            <JobCard job={job} />
          ))}
        </>
        
      )}
    </div>
  );
};


export async function getServerSideProps() {
    try {
        const res = await fetch('http://localhost:3000/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch');
    
        const jobs = await res.json();
    
        return {
          props: {
            jobs,
          },
        };
      } catch (error) {
        console.error('Error fetching jobs:', error);
        return {
          props: {
            jobs: [],
            error: 'Failed to load jobs.',
          },
        };
      }
  }
