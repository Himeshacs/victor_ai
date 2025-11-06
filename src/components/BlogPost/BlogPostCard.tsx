import type { BlogPost, Author } from "../../types/blogPost";
import { Card, CardImage, CardContent } from "../UI/Card/Card";
import { Tag } from "../UI";
import styles from "./BlogPostCard.module.css";
import { CMS_BASE_URL } from "../../utils";

interface BlogPostCardProps {
  post: BlogPost;
  onClick?: () => void;
}

const defaultAuthor: Author = {
  id: 0,
  full_name: "Unknown Author",
  name: "Unknown",
};

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  onClick,
}) => {
  const {
    title = "Untitled Post",
    excerpt,
    cover,
    author = defaultAuthor,
    publication_date,
    blogpost_categories = [],
  } = post;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const authorName = author?.full_name;
  const coverUrl = cover?.url ? `${CMS_BASE_URL}${cover.url}` : null;
  const coverAlt = cover?.alternativeText || title;
  const authorAvatarUrl = author?.avatar?.url
    ? `${CMS_BASE_URL}${author.avatar.url}`
    : null;
  const authorAvatarAlt = author?.avatar?.alternativeText || authorName;

  console.log("Rendering BlogPostCard for:", post);
  return (
    <Card hoverable className={styles.card} onClick={onClick}>
      {coverUrl && (
        <CardImage className={styles.image}>
          <img src={coverUrl} alt={coverAlt} loading="lazy" />
        </CardImage>
      )}

      <CardContent className={styles.content}>
        <div className={styles.text}>
          <h2 className={styles.title}>{title}</h2>
          {excerpt && (
            <span>
              <p className={styles.description}>{excerpt}</p>{" "}
              <span className={styles.readMore}>Read more</span>
            </span>
          )}
        </div>

        <div className={styles.meta}>
          <div className={styles.author}>
            {authorAvatarUrl && (
              <img
                src={authorAvatarUrl}
                alt={authorAvatarAlt}
                className={styles.avatar}
              />
            )}
            <span className={styles.authorName}>{authorName}</span>
          </div>
          <span className={styles.date}>{formatDate(publication_date)}</span>
        </div>

        {blogpost_categories.length > 0 && (
          <div className={styles.categories}>
            {blogpost_categories?.map((category) => (
              <Tag key={category.id} variant="outline">
                {category.name}
              </Tag>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
