import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://www.haojunmah.app/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.haojunmah.app/home",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.haojunmah.app/blog",
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
