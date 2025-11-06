import { Button } from "../UI/Button/Button";
import styles from "./Pagination.module.css";
import { useRef } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const isChanging = useRef(false);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;
    if (currentPage <= 4) return [...pages.slice(0, 5), "...", totalPages];
    if (currentPage >= totalPages - 3) return [1, "...", ...pages.slice(totalPages - 5)];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const handlePageChange = (page: number) => {
    if (isChanging.current || page === currentPage) return;

    isChanging.current = true;
    onPageChange(page);

    setTimeout(() => {
      isChanging.current = false;
    }, 400);
  };

  return (
    <nav className={styles.pagination} aria-label="Blog post navigation">
      <Button
        variant="ghost"
        className={`${styles.button} ${styles.prev}`}
        disabled={currentPage === 1 || isChanging.current}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <div className={styles.pages}>
        {getVisiblePages().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={page}
              className={`${styles.page} ${page === currentPage ? styles.active : ""}`}
              onClick={() => handlePageChange(page)}
              disabled={isChanging.current}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              {page}
            </span>
          )
        )}
      </div>

      <Button
        variant="ghost"
        className={`${styles.button} ${styles.next}`}
        disabled={currentPage === totalPages || isChanging.current}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  );
};
