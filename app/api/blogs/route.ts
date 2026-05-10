import { NextRequest, NextResponse } from "next/server";
import { BlogData } from "../../(blog)/blog/create/types";
import { prisma } from "../../lib/prisma";
import { isAuthenticated } from "../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 },
      );
    }

    const formData = await request.formData();

    // Extract blog data
    const blogDataString = formData.get("blogData") as string;
    if (!blogDataString) {
      return NextResponse.json(
        { error: "Blog data is required" },
        { status: 400 },
      );
    }

    const blogData: BlogData = JSON.parse(blogDataString);

    // Validate required fields
    if (!blogData.title || !blogData.author) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 },
      );
    }

    const createdBlog = await prisma.blog.create({
      data: {
        title: blogData.title,
        author: blogData.author,
        publishedAt: new Date(blogData.publishedAt),
        readTime: blogData.readTime || "5 min read",
        tags: blogData.tags || [],
        featuredImage: blogData.featuredImage || "",
        content: blogData.content,
      },
    });

    console.log("Blog created successfully:", createdBlog.id);

    return NextResponse.json(
      {
        message: "Blog Created Successfully",
        blog: createdBlog,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Get specific blog by ID
      const blog = await prisma.blog.findUnique({
        where: { id: id },
      });

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json({ blog });
    } else {
      // Get all blogs for listing
      const blogs = await prisma.blog.findMany({
        orderBy: {
          publishedAt: "desc",
        },
      });

      return NextResponse.json({
        blogs: blogs,
        count: blogs.length,
      });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check if user is authenticated
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");

    if (!blogId) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 },
      );
    }

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Note: For Vercel Blob we could parse the markdown string to find images
    // and delete them via @vercel/blob del() function, but for now we simply
    // delete the Postgres record to avoid unnecessary complexity/accidental deletions.

    // Delete the blog
    await prisma.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to delete blog",
      },
      { status: 500 },
    );
  }
}
