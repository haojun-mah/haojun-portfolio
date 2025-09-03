import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const imageId = resolvedParams.id;

        const image = await prisma.image.findUnique({
            where: { id: imageId },
        });

        if (!image) {
            return NextResponse.json(
                { error: "Image not found" },
                { status: 404 }
            );
        }

        // Convert base64 back to binary
        const imageBuffer = Buffer.from(image.data, 'base64');

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': image.mimeType,
                'Content-Length': image.size.toString(),
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });

    } catch (error) {
        console.error("Error retrieving image:", error);
        return NextResponse.json(
            { error: "Failed to retrieve image" },
            { status: 500 }
        );
    }
}
