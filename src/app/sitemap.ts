import type { MetadataRoute } from "next";
import { products } from "@/lib/data";
import { blogPosts, localLandingPages, seoProductSlug, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/phones`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...localLandingPages.map((page) => ({
      url: `${base}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page.slug.includes("rwanda") || page.slug.includes("kigali") ? 0.9 : 0.82,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.68,
    })),
    ...products.map((product) => ({
      url: `${base}/${seoProductSlug(product)}`,
      lastModified: new Date(product.createdAt),
      changeFrequency: "weekly" as const,
      priority: product.featured ? 0.9 : 0.78,
    })),
    ...products.map((product) => ({
      url: `${base}/phones/${product.slug}`,
      lastModified: new Date(product.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
  ];
}
