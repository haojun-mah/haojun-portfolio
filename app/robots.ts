import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.haojunmah.app/sitemap.xml",
    host: "https://www.haojunmah.app",
  };
}
