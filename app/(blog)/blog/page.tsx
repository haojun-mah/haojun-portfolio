import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogData } from "./create/types";
import { prisma } from "@/app/lib/prisma";
import { Metadata } from "next";

// Enable caching for better performance
export const revalidate = 30; // Revalidate every 30 seconds

// Add metadata for better SEO
export const metadata: Metadata = {
  title: "Blog - Hao Jun's Portfolio",
  description: "The writing and thoughts of Hao Jun",
  openGraph: {
    title: "Blog - Hao Jun's Portfolio",
    description: "The writing and thoughts of Hao Jun",
    type: "website",
  },
};

interface BlogListItem extends BlogData {
  id: string;
}

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

    blogs = blogData.map((blog) => ({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      publishedAt: blog.publishedAt.toISOString(),
      readTime: blog.readTime,
      tags: blog.tags,
      featuredImage: blog.featuredImage,
      content: blog.content
    }));
  } catch (err) {
    console.error('Error fetching blogs:', err);
    error = 'Failed to load blogs. Please try again later.';
  }

  const getExcerpt = (content: string): string => {
    if (!content) return 'No preview available...';
    
    // Simple basic text extraction from markdown string
    // remove markdown image links
    let plainText = content.replace(/!\[.*?\]\(.*?\)/g, '');
    // remove standard links
    plainText = plainText.replace(/\[(.*?)\]\(.*?\)/g, '$1');
    // remove markdown headers
    plainText = plainText.replace(/#+\s/g, '');
    // remove bold/italic
    plainText = plainText.replace(/(\*|_)/g, '');
    
    plainText = plainText.trim();

    return plainText.length > 150 
        ? plainText.substring(0, 150) + '...'
        : plainText || 'No preview available...';
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
              Hao Jun's Ramblings and Thoughts
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 whitespace-pre-wrap">
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
