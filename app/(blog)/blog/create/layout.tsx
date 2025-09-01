import CreateBlogForm from "./blog-data-entry";

export default function BlogCreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
