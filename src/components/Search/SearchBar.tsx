import { Input } from "../UI/Input/Input";
import { Button } from "../UI/Button/Button";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search blog posts..." }) => {
  return (
    <div className={styles.searchBar}>
      <Input value={value} onChange={onChange} placeholder={placeholder} className={styles.input} />
      {value && (
        <Button variant="ghost" size="sm" onClick={() => onChange("")} className={styles.clear} aria-label="Clear search">
          ×
        </Button>
      )}
    </div>
  );
};
