import { useEffect, useState } from "react";
import JobCard from "@/src/components/jobCard";
import styles from "@/styles/AllJobs.module.css";
import JobFilter from "@/src/components/JobFilter";
import Loading from "@/src/components/Loading";
import SearchBar from "@/src/components/SearchBar";

export default function JobsPage({ initialJobs, totalPages }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(totalPages);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobTypes: [],
    workMode: [],
    experience: [],
  });

  const fetchJobs = async (pageNumber, currentSearchTerm = '', currentFilters = filters) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pageNumber,
        limit: 10,
        search: currentSearchTerm,
        jobTypes: currentFilters.jobTypes.join(','),
        workMode: currentFilters.workMode.join(','),
        experience: currentFilters.experience.join(','),
      }).toString();
      console.log(queryParams)
      const res = await fetch(`/api/jobs?${queryParams}`);
      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();
      setJobs(data.jobs);
      setTotalPage( Math.ceil(data.totalJobs / 10)) //10 limit per pages
    } catch (err) {
      console.error("Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // reset to first page when filters change
  };

  useEffect(() => {
    fetchJobs(page, searchTerm, filters);
  }, [page]);

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.LeftSideBar}>
        <SearchBar term={searchTerm} onTermChange={setSearchTerm}/>
        <JobFilter onFilterChange={handleFilterChange} onApply={() => {setPage(1); fetchJobs(page, searchTerm, filters)}} />
      </div>

      <div className={styles.CentreContent}>
        <h1 className={styles.title}>All Jobs</h1>
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalpage}
          </span>
          <button
            className={styles.pageButton}
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>

        {!jobs || jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className={styles.jobCardsContainer}>
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>

                <div className={styles.pagination}>
                  <button
                    className={styles.pageButton}
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {totalpage}
                  </span>
                  <button
                    className={styles.pageButton}
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3000/api/jobs?page=1&limit=10");
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();

    const totalJobs = data.totalJobs;

    return {
      props: {
        initialJobs: data.jobs,
        totalPages: Math.ceil(totalJobs / 10),
      },
      revalidate: 86400,
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      props: { initialJobs: [], totalPages: 0, error: "Failed to load jobs." },
    };
  }
}