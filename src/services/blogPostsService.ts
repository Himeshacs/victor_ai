import { api } from "./api";
import type { BlogPost, BlogPostsResponse, PaginationInfo } from "../types/blogPost";
import { DEFAULT_PAGE_SIZE, DEFAULT_SORT } from "../utils";

interface GetBlogPostsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  category?: string;
  author?: string;
}

export const blogPostsService = {
  async getBlogPosts(params: GetBlogPostsParams = {}): Promise<BlogPostsResponse> {
    const { page = 1, pageSize = DEFAULT_PAGE_SIZE, search, sort = DEFAULT_SORT, category, author } = params;

    const queryParams: Record<string, string> = {
      _start: String((page - 1) * pageSize),
      _limit: String(pageSize),
      _sort: sort,
    };

    if (search) {
      queryParams.title_contains = search;
    }

    if (category) {
      queryParams["blogpost_categories.id"] = category;
    }

    if (author) {
      queryParams["author.id"] = author;
    }

    const [posts, total] = await Promise.all([api.get<BlogPost[]>("/blogposts", queryParams), this.getBlogPostsCount(queryParams)]);

    return {
      data: posts,
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
        total,
      },
    };
  },

  async getBlogPostsCount(filters?: Record<string, string>): Promise<number> {
    const count = await api.get<number>("/blogposts/count", filters);
    return count;
  },
};
