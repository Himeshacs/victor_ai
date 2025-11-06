import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { BlogPost, BlogPostsResponse } from "../../types";
import { blogPostsService } from "../../services/blogPostsService";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";

interface BlogPostsState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
  };
  filters: {
    search: string;
    category: string;
    author: string;
    sort: string;
  };
}

const initialState: BlogPostsState = {
  posts: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
  },
  filters: {
    search: "",
    category: "",
    author: "",
    sort: "publication_date:DESC",
  },
};

export const fetchBlogPosts = createAsyncThunk(
  "blogPosts/fetchBlogPosts",
  async (filters: { page: number; search?: string; category?: string; author?: string; sort: string }) => {
    const response: BlogPostsResponse = await blogPostsService.getBlogPosts({
      ...filters,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    return response;
  }
);

const blogPostsSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<BlogPostsState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setFiltersFromURL: (
      state,
      action: PayloadAction<{
        page?: string;
        search?: string;
        category?: string;
        author?: string;
        sort?: string;
      }>
    ) => {
      const { page, search, category, author, sort } = action.payload;

      if (page) state.pagination.currentPage = parseInt(page);
      if (search !== undefined) state.filters.search = search;
      if (category !== undefined) state.filters.category = category;
      if (author !== undefined) state.filters.author = author;
      if (sort !== undefined) state.filters.sort = sort;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pagination.page,
          totalPages: action.payload.pagination.pageCount,
          totalPosts: action.payload.pagination.total,
        };
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blog posts";
      });
  },
});

export const { updateFilters, setPage, setFiltersFromURL, clearError, clearFilters } = blogPostsSlice.actions;
export default blogPostsSlice.reducer;
