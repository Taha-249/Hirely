import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar({ title, options }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <Link href="/" className={styles.title}>
            {title}
          </Link>
        </div>

        <div className={styles.menu}>
          <ul>
            {options &&
              options.map((option, ind) => (
                <li key={ind}>
                  {(option.link || option.link === "") ? <Link href={`/${option.link}`} className={styles.menuLink}>
                    {option.title}
                  </Link>:
                  <button onClick={option.onClick} className={styles.menuButton}>{option.title}</button>}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
