export interface ContentBlock {
  type: string;
  text?: string;
  level?: number;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface BlogData {
  title: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featuredImage: string;
  content: ContentBlock[];
}
