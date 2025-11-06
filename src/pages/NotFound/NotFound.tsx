import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div>
      <main className="main-content">
        <div className="container">
          <div className={styles.notFound}>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className={styles.homeLink}>
              Go back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
