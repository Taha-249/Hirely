import styles from './RoleSelector.module.css';

export default function RoleSelector({ role, setRole }) {
  return (
    <div className={styles.inputGroup}>
      <select
        className={styles.select}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="company">Company</option>
      </select>
    </div>
  );
}
