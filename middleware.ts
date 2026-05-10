import { NextRequest, NextResponse } from "next/server";

// Paths that have markdown representations
const MARKDOWN_PATHS = new Set(["/home", "/blog", "/"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle .md URL variants (e.g. /home.md)
  if (pathname.endsWith(".md")) {
    const basePath = pathname.slice(0, -3);
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown";
    url.searchParams.set("path", basePath || "/");
    return NextResponse.rewrite(url);
  }

  // Handle content negotiation: Accept: text/markdown
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/markdown") && MARKDOWN_PATHS.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match .md URLs
    "/:path*.md",
    // Match known content pages for Accept header negotiation
    "/home",
    "/blog",
  ],
};
