import styles from "./Tag.module.css";

interface TagProps {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md";
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, variant = "solid", color = "primary", size = "md", className = "" }) => {
  return <span className={`${styles.tag} ${styles[variant]} ${styles[color]} ${styles[size]} ${className}`}>{children}</span>;
};
