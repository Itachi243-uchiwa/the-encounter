import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/** /robots.txt : tout est public ; le sitemap est déclaré pour Google Search Console. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
