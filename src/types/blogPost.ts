export interface Author {
  id: number;
  full_name: string;
  name?: string;
  avatar?: {
    url: string;
    alternativeText: string;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  publication_date: string;
  author: Author;
  blogpost_categories: Array<{
    id: number;
    name: string;
  }>;
  cover: {
    url: string;
    alternativeText: string;
  };
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface BlogPostsResponse {
  data: BlogPost[];
  pagination: PaginationInfo;
}
