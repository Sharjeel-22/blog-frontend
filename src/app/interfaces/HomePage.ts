export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

// This matches your actual BlogPost interface
export default interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: Date;
}

// Updated interface that extends your BlogPost and matches backend API
export interface Post {
  id: string; // UUID from backend
  title: string;
  excerpt: string; // This is the main content/body
  summary?: string;
  status: PostStatus;
  featuredImage?: string;
  tags?: string[];
  category?: string;
  viewCount: number;
  likeCount: number;
  isActive: boolean;
  publishedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  authorId: string;
  excerptLength?: number;
  authorObject?: User;
  readingTime?: number;
}

// Extended interface for additional features matching your existing BlogPostExtended
export interface BlogPostExtended extends BlogPost {
  category?: string;
  readTime?: number;
  views?: number;
  featuredImage?: string;
  content?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  status?: 'published' | 'draft' | 'archived';
  slug?: string;
  lastModified?: string | Date;
  summary?: string; // Alternative to excerpt
}

// Content sections interface (keeping your existing structure)
export interface ContentSection {
  id?: string;
  title?: string;
  content: string;
  order?: number;
  type?: 'text' | 'code' | 'image' | 'quote' | 'list';
}

// API Request/Response interfaces
export interface CreatePostRequest {
  title: string;
  excerpt: string; // Main content body
  summary?: string;
  status?: PostStatus;
  featuredImage?: string;
  tags?: string[];
  category?: string;
  publishNow?: boolean;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {}

export interface PostQueryParams {
  page?: number;
  limit?: number;
  status?: PostStatus;
  category?: string;
  tag?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PostsResponse {
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PostResponse {
  message?: string;
  data?: Post;
}

// Utility function to convert backend Post to your BlogPost format
export function convertPostToBlogPost(post: Post): BlogPost {
  return {
    id: parseInt(post.id) || 0, // Convert UUID to number (or use hash if needed)
    title: post.title,
    excerpt: post.excerpt,
    author: `${post.author.firstName} ${post.author.lastName}`,
    publishedDate: post.publishedDate || post.createdAt,
  };
}

// Utility function to convert backend Post to your BlogPostExtended format
export function convertPostToBlogPostExtended(post: Post): BlogPostExtended {
  const basePost = convertPostToBlogPost(post);
  return {
    ...basePost,
    category: post.category,
    readTime: post.readingTime,
    views: post.viewCount,
    featuredImage: post.featuredImage,
    content: post.excerpt, // excerpt is the main content in our backend
    tags: post.tags,
    likes: post.likeCount,
    comments: 0, // You can implement comments later
    status: post.status as 'published' | 'draft' | 'archived',
    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    lastModified: post.updatedAt,
    summary: post.summary,
  };
}

// Utility function to create backend Post from your BlogPost
export function convertBlogPostToCreateRequest(blogPost: Partial<BlogPost & BlogPostExtended>): CreatePostRequest {
  return {
    title: blogPost.title || '',
    excerpt: blogPost.excerpt || blogPost.content || '', // Use content as excerpt if available
    summary: blogPost.summary,
    status: blogPost.status ? 
      (blogPost.status === 'published' ? PostStatus.PUBLISHED : 
       blogPost.status === 'draft' ? PostStatus.DRAFT : 
       PostStatus.ARCHIVED) : PostStatus.DRAFT,
    featuredImage: blogPost.featuredImage,
    tags: blogPost.tags,
    category: blogPost.category,
    publishNow: blogPost.status === 'published',
  };
}