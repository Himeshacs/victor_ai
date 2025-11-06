import { useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { fetchBlogPosts, updateFilters, setPage, setFiltersFromURL } from "../store/slices/blogPostsSlice";

export const useBlogPosts = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);
  const lastFetchParams = useRef<string>("");

  const { posts, loading, error, pagination, filters } = useAppSelector((state) => state.blogPosts);

  useEffect(() => {
    if (isInitialMount.current) {
      const urlFilters = {
        page: searchParams.get("page") || undefined,
        search: searchParams.get("search") || undefined,
        category: searchParams.get("category") || undefined,
        author: searchParams.get("author") || undefined,
        sort: searchParams.get("sort") || undefined,
      };

      dispatch(setFiltersFromURL(urlFilters));
      isInitialMount.current = false;
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (isInitialMount.current) return;

    const params = new URLSearchParams();

    if (pagination.currentPage > 1) params.set("page", pagination.currentPage.toString());
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.author) params.set("author", filters.author);
    if (filters.sort !== "publication_date:DESC") params.set("sort", filters.sort);

    const newParamsString = params.toString();
    const currentParamsString = searchParams.toString();

    if (newParamsString !== currentParamsString) {
      setSearchParams(params, { replace: true });
    }
  }, [filters, pagination.currentPage, setSearchParams, searchParams]);

  useEffect(() => {
    const fetchKey = JSON.stringify({
      page: pagination.currentPage,
      search: filters.search || "",
      category: filters.category || "",
      author: filters.author || "",
      sort: filters.sort,
    });

    if (fetchKey === lastFetchParams.current && !isInitialMount.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      lastFetchParams.current = fetchKey;

      dispatch(
        fetchBlogPosts({
          page: pagination.currentPage,
          search: filters.search || undefined,
          category: filters.category || undefined,
          author: filters.author || undefined,
          sort: filters.sort,
        })
      );
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [dispatch, pagination.currentPage, filters.search, filters.category, filters.author, filters.sort]);

  const handleUpdateFilters = useCallback(
    (newFilters: Partial<typeof filters>) => {
      dispatch(updateFilters(newFilters));
    },
    [dispatch]
  );

  const handleSetPage = useCallback(
    (page: number) => {
      if (page !== pagination.currentPage && page >= 1 && page <= pagination.totalPages) {
        dispatch(setPage(page));
      }
    },
    [dispatch, pagination.currentPage, pagination.totalPages]
  );

  return {
    posts,
    loading,
    error,
    pagination,
    filters,
    updateFilters: handleUpdateFilters,
    setPage: handleSetPage,
  };
};
