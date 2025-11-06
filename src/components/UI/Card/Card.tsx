import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hoverable = false, onClick }) => {
  return (
    <div className={`${styles.card} ${hoverable ? styles.hoverable : ""} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardImage: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => <div className={`${styles.image} ${className}`}>{children}</div>;

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => <div className={`${styles.content} ${className}`}>{children}</div>;
