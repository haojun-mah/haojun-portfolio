import { redirect } from 'next/navigation';
import { isAuthenticated } from '../../../lib/auth';
import Header from "./header";
import CreateBlogForm from "./blog-data-entry";
import BlogManagement from "@/components/BlogManagement";

export default async function CreateBlogPage() {
  // Check if user is authenticated (server-side)
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    // Redirect to blog list if not authenticated
    redirect('/blog');
  }

  return (
    <>
      <Header />
      <CreateBlogForm />
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <BlogManagement />
      </div>
    </>
  );
}

