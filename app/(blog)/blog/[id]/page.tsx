import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";

// Enable static generation and caching
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamicParams = true; // Allow new dynamic routes

// Generate static params for existing blogs
export async function generateStaticParams() {
  const prisma = new PrismaClient();
  
  try {
    const blogs = await prisma.blog.findMany({
      select: { id: true },
      take: 10 // Limit to most recent 10 blogs for build time
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return blogs.map((blog: any) => ({
      id: blog.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export interface ContentBlock {
  type: string;
  text?: string;
  level?: number;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface BlogData {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featuredImage: string;
  content: Array<ContentBlock>;
}

const prisma = new PrismaClient();

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!blog) {
      return {
        title: 'Blog Not Found',
        description: 'The requested blog post could not be found.'
      };
    }

    return {
      title: blog.title,
      description: `By ${blog.author} - ${blog.readTime}`,
      openGraph: {
        title: blog.title,
        description: `By ${blog.author} - ${blog.readTime}`,
        images: blog.featuredImage ? [blog.featuredImage] : [],
      },
    };
  } catch {
    return {
      title: 'Blog',
      description: 'Blog post'
    };
  }
}

// Server component for dynamic blog page
export default async function BlogReadPage({ params }: { params: { id: string } }) {
  let blog: BlogData | null = null;
  
  try {
    const resolvedParams = await params;
    const blogData = await prisma.blog.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!blogData) {
      notFound(); // This will show the 404 page
    }

    blog = {
      id: blogData!.id,
      title: blogData!.title,
      author: blogData!.author,
      publishedAt: blogData!.publishedAt.toISOString(),
      readTime: blogData!.readTime,
      tags: blogData!.tags,
      featuredImage: blogData!.featuredImage,
      content: blogData!.content as unknown as ContentBlock[]
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-foreground leading-relaxed mb-6">
            {block.text}
          </p>
        );
      
      case 'heading1':
        return (
          <h1 key={index} className="text-4xl font-bold text-foreground mb-6 mt-8">
            {block.text}
          </h1>
        );
      
      case 'heading2':
        return (
          <h2 key={index} className="text-3xl font-bold text-foreground mb-4 mt-8">
            {block.text}
          </h2>
        );
      
      case 'heading3':
        return (
          <h3 key={index} className="text-2xl font-bold text-foreground mb-4 mt-6">
            {block.text}
          </h3>
        );
      
      case 'heading4':
        return (
          <h4 key={index} className="text-xl font-bold text-foreground mb-3 mt-6">
            {block.text}
          </h4>
        );
      
      case 'image':
        return (
          <div key={index} className="my-8">
            {block.src && (
              <div className="space-y-3">
                <img
                  src={block.src}
                  alt={block.alt || ''}
                  className="w-full rounded-lg shadow-lg"
                />
                {block.caption && (
                  <p className="text-sm text-muted-foreground italic text-center">
                    {block.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!blog) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="mb-12">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-2">
            <span>By</span>
            <span className="font-medium text-foreground">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Published</span>
            <span className="font-medium">{formatDate(blog.publishedAt)}</span>
          </div>
          {blog.readTime && (
            <div className="flex items-center gap-2">
              <span>{blog.readTime}</span>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="mb-12">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {blog.content && blog.content.length > 0 ? (
          blog.content.map((block, index) => renderContentBlock(block, index))
        ) : (
          <p className="text-muted-foreground italic">No content available for this blog post.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Published by <span className="font-medium text-foreground">{blog.author}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(blog.publishedAt)}
            </p>
          </div>
          <Link
            href="/blog"
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
          >
            More Posts
          </Link>
        </div>
      </footer>
    </article>
  );
}