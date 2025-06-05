import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  let sitemap: MetadataRoute.Sitemap = [
    {
      url: "https://calculator.owlsentry.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  return sitemap;
}
