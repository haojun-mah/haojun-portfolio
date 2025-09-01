import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogData } from "./create/types";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";

// Enable caching for better performance
export const revalidate = 30; // Revalidate every 30 seconds

// Add metadata for better SEO
export const metadata: Metadata = {
  title: "Blog - Hao Jun's Portfolio",
  description: "Thoughts, tutorials, and insights about web development and technology",
  openGraph: {
    title: "Blog - Hao Jun's Portfolio",
    description: "Thoughts, tutorials, and insights about web development and technology",
    type: "website",
  },
};

interface BlogListItem extends BlogData {
  id: string;
}

// Create a singleton Prisma client for better performance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Server component - no useState, useEffect needed
export default async function BlogList() {
  let blogs: BlogListItem[] = [];
  let error = '';

  try {
    // Fetch blogs with optimized query
    const blogData = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        publishedAt: true,
        readTime: true,
        tags: true,
        featuredImage: true,
        content: true,
      },
      orderBy: {
        publishedAt: 'desc'
      },
      // Add pagination if you have many blogs
      // take: 20,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogs = blogData.map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      publishedAt: blog.publishedAt.toISOString(),
      readTime: blog.readTime,
      tags: blog.tags,
      featuredImage: blog.featuredImage,
      content: blog.content as any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    }));
  } catch (err) {
    console.error('Error fetching blogs:', err);
    error = 'Failed to load blogs. Please try again later.';
  } finally {
    // Don't disconnect in serverless environments
    if (process.env.NODE_ENV !== 'production') {
      await prisma.$disconnect();
    }
  }

  const getExcerpt = (content: any[]): string => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!content || !Array.isArray(content)) return 'No preview available...';
    
    const firstParagraph = content.find(block => 
      block?.type === 'paragraph' && block?.text
    );
    if (firstParagraph?.text) {
      return firstParagraph.text.length > 150 
        ? firstParagraph.text.substring(0, 150) + '...'
        : firstParagraph.text;
    }
    return 'No preview available...';
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">Blog</h1>
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-muted-foreground text-lg">
              Thoughts, tutorials, and insights about web development
            </p>
          </div>
        </div>

      {/* Blog Count */}
      <div className="mb-8">
        <p className="text-muted-foreground">
          {blogs.length} {blogs.length === 1 ? 'post' : 'posts'} published
        </p>
      </div>

      {/* Blog Grid */}
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-muted rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">No blogs yet</h3>
            <p className="text-muted-foreground">
              Check back later for new content.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="relative h-48 bg-muted overflow-hidden">
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        +{blog.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${blog.id}`}>
                    {blog.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {getExcerpt(blog.content)}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>By {blog.author}</span>
                    {blog.readTime && <span>{blog.readTime}</span>}
                  </div>
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>

                {/* Read More Link */}
                <div className="mt-4">
                  <Link
                    href={`/blog/${blog.id}`}
                    className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center gap-1"
                  >
                    Read more 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
