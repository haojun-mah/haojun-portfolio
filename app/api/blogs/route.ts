import { NextRequest, NextResponse } from "next/server";
import { BlogData } from "../../(blog)/blog/create/types";
import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "../../lib/auth";

const prisma = new PrismaClient();

// Helper function to process uploaded images
async function processUploadedImage(file: File): Promise<string> {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        throw new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.");
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        throw new Error("File too large. Maximum size is 5MB.");
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');

    // Save to database
    const savedImage = await prisma.image.create({
        data: {
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            data: base64Data,
        },
    });

    return `/api/images/${savedImage.id}`;
}

export async function POST(request: NextRequest) {
    try {
        // Check if user is authenticated
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json(
                { error: "Unauthorized. Admin access required." },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        
        // Extract blog data
        const blogDataString = formData.get('blogData') as string;
        if (!blogDataString) {
            return NextResponse.json(
                { error: "Blog data is required" },
                { status: 400 }
            );
        }

        const blogData: BlogData = JSON.parse(blogDataString);
        
        // Validate required fields
        if (!blogData.title || !blogData.author) {
            return NextResponse.json(
                { error: "Title and author are required" },
                { status: 400 }
            );
        }

        // Process featured image if uploaded
        let featuredImageUrl = blogData.featuredImage;
        const featuredImageFile = formData.get('featuredImage') as File;
        if (featuredImageFile && featuredImageFile.size > 0) {
            featuredImageUrl = await processUploadedImage(featuredImageFile);
        }

        // Process content images
        const updatedContent = [];
        for (let i = 0; i < blogData.content.length; i++) {
            const block = blogData.content[i];
            if (block.type === 'image') {
                const imageFile = formData.get(`contentImage_${i}`) as File;
                if (imageFile && imageFile.size > 0) {
                    const imageUrl = await processUploadedImage(imageFile);
                    updatedContent.push({
                        ...block,
                        src: imageUrl
                    });
                } else {
                    updatedContent.push(block);
                }
            } else {
                updatedContent.push(block);
            }
        }
        
        const createdBlog = await prisma.blog.create({
            data: {
                title: blogData.title,
                author: blogData.author,
                publishedAt: new Date(blogData.publishedAt),
                readTime: blogData.readTime || "5 min read",
                tags: blogData.tags || [],
                featuredImage: featuredImageUrl || "",
                content: JSON.parse(JSON.stringify(updatedContent)), // Ensure proper JSON serialization for Prisma
            },
        });
        
        console.log("Blog created successfully:", createdBlog);

        return NextResponse.json(
            {
                message: "Blog Created Successfully",
                blog: createdBlog
            },
            { status: 201 }
        );
    } catch (error) {
       console.error("Error creating blog:", error);
       return NextResponse.json(
           { error: error instanceof Error ? error.message : "Internal Server Error" },
           { status: 500 }
       );
   }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            // Get specific blog by ID
            const blog = await prisma.blog.findUnique({
                where: { id: id }
            });

            if (!blog) {
                return NextResponse.json(
                    { error: "Blog not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                blog: blog
            });
        } else {
            // Get all blogs for listing
            const blogs = await prisma.blog.findMany({
                orderBy: {
                    publishedAt: 'desc'
                }
            });

            return NextResponse.json({
                blogs: blogs,
                count: blogs.length
            });
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
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
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const blogId = searchParams.get('id');

        if (!blogId) {
            return NextResponse.json(
                { error: "Blog ID is required" },
                { status: 400 }
            );
        }

        // Check if blog exists
        const existingBlog = await prisma.blog.findUnique({
            where: { id: blogId }
        });

        if (!existingBlog) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        // Delete associated images first (to clean up orphaned images)
        // We'll extract image IDs from the content and featuredImage
        const imageIds: string[] = [];
        
        // Extract featured image ID
        if (existingBlog.featuredImage) {
            const imageIdMatch = existingBlog.featuredImage.match(/\/api\/images\/([^\/]+)$/);
            if (imageIdMatch) {
                imageIds.push(imageIdMatch[1]);
            }
        }

        // Extract content image IDs
        const content = existingBlog.content as unknown[];
        if (Array.isArray(content)) {
            content.forEach((block: unknown) => {
                const imageBlock = block as { type?: string; src?: string };
                if (imageBlock.type === 'image' && imageBlock.src) {
                    const imageIdMatch = imageBlock.src.match(/\/api\/images\/([^\/]+)$/);
                    if (imageIdMatch) {
                        imageIds.push(imageIdMatch[1]);
                    }
                }
            });
        }

        // Delete the blog
        await prisma.blog.delete({
            where: { id: blogId }
        });

        // Delete associated images
        if (imageIds.length > 0) {
            await prisma.image.deleteMany({
                where: {
                    id: {
                        in: imageIds
                    }
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: "Blog deleted successfully",
            deletedImageCount: imageIds.length
        });

    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to delete blog" },
            { status: 500 }
        );
    }
}
