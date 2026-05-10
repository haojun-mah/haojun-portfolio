import { isAuthenticated } from "../../../lib/auth";
import Header from "./header";
import CreateBlogForm from "./blog-data-entry";
import BlogManagement from "@/components/BlogManagement";
import LoginRedirect from "./login-redirect";

export default async function CreateBlogPage() {
  // Check if user is authenticated (server-side)
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    // If not authenticated, render a client component that manages the Login Modal
    return <LoginRedirect />;
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
