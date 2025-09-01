"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Blog {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      setError('Failed to load blogs');
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId: string, blogTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(blogId);
    setError('');

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete blog');
      }

      // Remove from local state
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete blog');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Manage Blogs</h3>
        <p className="text-muted-foreground">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Manage Blogs</h3>
        <span className="text-sm text-muted-foreground">
          {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {blogs.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No blogs created yet. Create your first blog post above!
        </p>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">
                  {blog.title}
                </h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span>By {blog.author}</span>
                  <span>{formatDate(blog.publishedAt)}</span>
                  {blog.readTime && <span>{blog.readTime}</span>}
                </div>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{blog.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => router.push(`/blog/${blog.id}`)}
                  className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(blog.id, blog.title)}
                  disabled={deleting === blog.id}
                  className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded hover:bg-destructive/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting === blog.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
