import { Button } from "../UI/Button/Button";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
  filters: {
    category: string;
    author: string;
    sort: string;
  };
  onFilterChange: (filters: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const sortOptions = [
    { value: "publication_date:DESC", label: "Newest First" },
    { value: "publication_date:ASC", label: "Oldest First" },
    { value: "title:ASC", label: "Title A-Z" },
    { value: "title:DESC", label: "Title Z-A" },
  ];

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label htmlFor="sort" className={styles.filterLabel}>
          Sort by:
        </label>
        <select id="sort" value={filters.sort} onChange={(e) => onFilterChange({ sort: e.target.value })} className={styles.filterSelect}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onFilterChange({ category: "", author: "", sort: "publication_date:DESC" })}
          className={styles.filterClear}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};
