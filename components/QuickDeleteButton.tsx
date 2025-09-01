"use client";

import { useState } from 'react';

interface QuickDeleteButtonProps {
  blogId: string;
  blogTitle: string;
  onDeleted: () => void;
}

export default function QuickDeleteButton({ blogId, blogTitle, onDeleted }: QuickDeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/blogs?id=${blogId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete blog');
      }

      onDeleted(); // Callback to refresh the list
      
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-destructive hover:text-destructive/80 text-xs font-medium disabled:opacity-50"
      title="Delete blog"
    >
      {loading ? '...' : '🗑️'}
    </button>
  );
}
