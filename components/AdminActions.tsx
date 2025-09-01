"use client";

import { useEffect, useState } from 'react';
import DeleteBlogButton from './DeleteBlogButton';

interface AdminActionsProps {
  blogId: string;
  blogTitle: string;
}

export default function AdminActions({ blogId, blogTitle }: AdminActionsProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check admin status by making a simple authenticated request
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        setIsAdmin(data.isAdmin === true);
      } catch {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return null; // Don't show anything while checking
  }

  if (!isAdmin) {
    return null; // Don't show admin actions for non-admin users
  }

  return (
    <div className="mt-8 p-4 bg-muted/50 rounded-lg border-l-4 border-l-primary">
      <h3 className="text-sm font-semibold text-foreground mb-3">Admin Actions</h3>
      <div className="flex gap-3">
        <DeleteBlogButton blogId={blogId} blogTitle={blogTitle} />
      </div>
    </div>
  );
}
