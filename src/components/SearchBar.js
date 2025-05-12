import styles from "./SearchBar.module.css";

export default function SearchBar({ term, onTermChange }) {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search jobs..."
        value={term}
        onChange={(e) => {
          onTermChange(e.target.value);
        }}
      />
    </div>
  );
}
