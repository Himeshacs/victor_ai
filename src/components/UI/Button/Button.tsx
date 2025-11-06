import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", size = "md", onClick, disabled = false, type = "button", className = "" }) => {
  return (
    <button type={type} className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
