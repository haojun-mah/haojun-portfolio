import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const blob = await put(filename, request.body as ReadableStream, {
      access: 'public',
      allowOverwrite: true,
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
