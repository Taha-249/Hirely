import { useState } from "react";
import styles from "./jobFilter.module.css";

export default function JobFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    jobTypes: [],
    workMode: [],
    experience: [],
    salary: 100000,
  });

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const currentValues = prev[key];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      const newFilters = { ...prev, [key]: updatedValues };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleSalaryChange = (e) => {
    const value = parseInt(e.target.value);
    const newFilters = { ...filters, salary: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.title}>Filter Jobs</h2>
      <div className={styles.filterSection}>
        <h4 className={styles.filterSectionTitle}>Job Type</h4>
        {["Full Time", "Part Time", "Contract", "Internship"].map((type) => (
          <label key={type} className={styles.filterLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              onChange={() => handleCheckboxChange("jobTypes", type)}
              checked={filters.jobTypes.includes(type)}
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
              onChange={() => handleCheckboxChange("workMode", mode)}
              checked={filters.workMode.includes(mode)}
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
          min="20000"
          max="200000"
          step="1000"
          value={filters.salary}
          onChange={handleSalaryChange}
          className={styles.rangeInput}
        />
        <p className={styles.rangeValue}>${filters.salary.toLocaleString()}</p>
      </div>
    </div>
  );
}
