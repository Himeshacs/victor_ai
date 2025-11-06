import { useBlogPosts } from "../../hooks/useBlogPosts";
import { BlogPostCard, BlogPostGridSkeleton } from "../../components";
import { Pagination } from "../../components/Pagination";
import { SearchBar } from "../../components/Search";
import { FilterBar } from "../../components/Filters";
import styles from "./Blogs.module.css";
import type { BlogPost } from "../../types";
import { memo, useCallback } from "react";

const BlogContent = memo(
  ({ posts, loading, error, pagination, filters }: { posts: BlogPost[]; loading: boolean; error: string | null; pagination: any; filters: any }) => {
    if (error) return <div className={styles.errorMessage}>{error}</div>;

    if (loading) return <BlogPostGridSkeleton />;

    if (posts?.length === 0) {
      return <div className={styles.emptyState}>{filters?.search ? "No posts found matching your search." : "No blog posts available."}</div>;
    }

    return (
      <>
        <div className={styles.resultsInfo}>
          Showing {posts?.length} of {pagination?.totalPosts} posts
          {filters?.search && ` for "${filters?.search}"`}
        </div>

        <div className={styles.blogGrid}>
          {posts?.map((post: BlogPost) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </>
    );
  }
);

export const Blogs = () => {
  const { posts, loading, error, pagination, filters, updateFilters, setPage } = useBlogPosts();

  const handleSearchChange = useCallback(
    (search: string) => {
      updateFilters({ search });
    },
    [updateFilters]
  );

  const handleSetPage = useCallback(
    (page: number) => {
      setPage(page);
    },
    [setPage]
  );

  return (
    <div className={styles.blogGridPage}>
      <main className="main-content">
        <div className="container">
          <div className={styles.pageHeader}>
            <h1>Blog Posts</h1>
            <SearchBar value={filters?.search} onChange={handleSearchChange} />
          </div>

          <FilterBar filters={filters} onFilterChange={updateFilters} />

          <BlogContent posts={posts || []} loading={loading} error={error} pagination={pagination} filters={filters} />

          {pagination?.totalPages > 1 && <Pagination currentPage={pagination?.currentPage} totalPages={pagination?.totalPages} onPageChange={handleSetPage} />}
        </div>
      </main>
    </div>
  );
};
