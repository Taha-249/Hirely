import styles from './CompanyFields.module.css';

export default function CompanyFields({
  companyTitle,
  setCompanyTitle,
  companyDescription,
  setCompanyDescription,
  companyLocation,
  setCompanyLocation
}) {
  return (
    <>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          placeholder="Company Title"
          value={companyTitle}
          onChange={(e) => setCompanyTitle(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <textarea
          className={styles.input}
          placeholder="Company Description"
          value={companyDescription}
          onChange={(e) => setCompanyDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          placeholder="Location"
          value={companyLocation}
          onChange={(e) => setCompanyLocation(e.target.value)}
        />
      </div>
    </>
  );
}
