import { Card, CardImage, CardContent } from "../UI/Card/Card";
import { Skeleton } from "../UI/Skeleton/Skeleton";
import styles from "./BlogPostSkeleton.module.css";

export const BlogPostSkeleton: React.FC = () => {
  return (
    <Card className={styles.blogPostSkeleton}>
      <CardImage>
        <div className={styles.skeletonImage}></div>
      </CardImage>
      <CardContent className={styles.skeletonContent}>
        <Skeleton className={styles.skeletonTitle} />
        <Skeleton className={styles.skeletonDescription} />
        <div className={styles.skeletonMeta}>
          <Skeleton className={styles.skeletonAuthor} />
          <Skeleton className={styles.skeletonDate} />
        </div>
      </CardContent>
    </Card>
  );
};

export const BlogPostGridSkeleton: React.FC = () => {
  return (
    <div className="blog-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <BlogPostSkeleton key={index} />
      ))}
    </div>
  );
};
