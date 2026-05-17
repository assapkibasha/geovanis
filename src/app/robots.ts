import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/phones", "/blog", "/iphone-rwanda", "/samsung-rwanda", "/phones-kigali", "/smartphones-rwanda"],
        disallow: ["/admin/", "/api/", "/_next/static/chunks/pages/admin"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
