import { useState, useEffect } from "react";
import styles from "./jobFilter.module.css";

export default function JobFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: [],
    workmode: [],
    experience: [],
    salary: 100000,
    search: "",
  });

  useEffect(() => {
    onFilterChange?.(filters);
  }, [filters]);

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const current = prev[key];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const handleSalaryChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters((prev) => ({ ...prev, salary: value }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.title}>Filter Jobs</h2>

      <input
        type="text"
        placeholder="Search jobs..."
        className={styles.searchInput}
        value={filters.search}
        onChange={handleSearchChange}
      />

      <div className={styles.filterSection}>
        <h4 className={styles.filterSectionTitle}>Job Type</h4>
        {["Full Time", "Part Time", "Contract", "Internship"].map((type) => (
          <label key={type} className={styles.filterLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              onChange={() => handleCheckboxChange("category", type)}
              checked={filters.category.includes(type)}
            />
            {type}
          </label>
        ))}
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterSectionTitle}>Work Mode</h4>
        {["Remote", "Hybrid", "On Site"].map((mode) => (
          <label key={mode} className={styles.filterLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              onChange={() => handleCheckboxChange("workmode", mode)}
              checked={filters.workmode.includes(mode)}
            />
            {mode}
          </label>
        ))}
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterSectionTitle}>Experience Level</h4>
        {["Entry", "Mid", "Senior"].map((level) => (
          <label key={level} className={styles.filterLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              onChange={() => handleCheckboxChange("experience", level)}
              checked={filters.experience.includes(level)}
            />
            {level}
          </label>
        ))}
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.filterSectionTitle}>Max Salary</h4>
        <input
          type="range"
          min="2000"
          max="500000"
          step="1000"
          value={filters.salary}
          onChange={handleSalaryChange}
          className={styles.rangeInput}
        />
        <p className={styles.rangeValue}>PKR:{filters.salary.toLocaleString()}</p>
      </div>
    </div>
  );
}