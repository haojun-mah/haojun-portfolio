"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteBlogButtonProps {
  blogId: string;
  blogTitle: string;
}

export default function DeleteBlogButton({ blogId, blogTitle }: DeleteBlogButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/blogs?id=${blogId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete blog');
      }

      // Success - redirect to blog listing
      router.push('/blog');
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete blog');
      setLoading(false);
    }
  };

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/80 transition-colors text-sm font-medium"
      >
        Delete Post
      </button>
    );
  }

  return (
    <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
      <h3 className="text-destructive font-semibold mb-2">Delete Blog Post</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Are you sure you want to delete &quot;<strong>{blogTitle}</strong>&quot;? This action cannot be undone.
      </p>
      
      {error && (
        <div className="bg-destructive/20 border border-destructive text-destructive px-3 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/80 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </button>
        <button
          onClick={() => {
            setShowConfirm(false);
            setError('');
          }}
          disabled={loading}
          className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
