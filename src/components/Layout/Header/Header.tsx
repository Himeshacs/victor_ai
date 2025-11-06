import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useTheme } from "../../../contexts/ThemeContext";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            <h1>VIKTOR.AI</h1>
          </Link>

          <div className={styles.actions}>
            <button className={styles.themeToggle} onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <nav className={styles.nav}>
              <Link to="/" className={styles.navLink}>
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
