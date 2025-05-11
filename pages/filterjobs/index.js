import { useEffect, useState } from "react";
import JobFilter from "@/src/components/JobFilter";
import JobCard from "@/src/components/jobcard";
import styles from "@/styles/filterjobs.module.css";

export default function FilterJobsPage() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    workmode: [],
    experience: [],
    salary: 2000,
    search: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setAllJobs(data);
        setFilteredJobs(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
  let jobs = [...allJobs];

  // Search
  if (filters.search?.trim()) {
    const term = filters.search.toLowerCase();
    jobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term)
    );
  }

  // Category
  if (filters.category?.length > 0) {
    jobs = jobs.filter((job) => filters.category.includes(job.category));
  }

  // Work Mode
  if (filters.workmode?.length > 0) {
    jobs = jobs.filter((job) => filters.workmode.includes(job.workmode));
  }

  // Experience
  if (filters.experience?.length > 0) {
    jobs = jobs.filter((job) => filters.experience.includes(job.experience));
  }

  // Salary
  if (filters.salary) {
    jobs = jobs.filter((job) => {
      const match = job.salary.match(/(\d+)k(?:-(\d+)k)?/i);
      if (match) {
        const minSalary = parseInt(match[1]) * 1000;
        return minSalary <= filters.salary;
      }
      return true;
    });
  }

  setFilteredJobs(jobs);
}, [filters, allJobs]);

  return (
    <div className={styles.jobsLayout}>
      <div className={styles.filterColumn}>
        <JobFilter onFilterChange={setFilters} />
      </div>
      <div className={styles.jobsColumn}>
        <h1>Job Listings</h1>
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}