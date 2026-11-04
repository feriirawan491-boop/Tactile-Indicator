import type { MetadataRoute } from "next";
import { absoluteUrl, siteIndexable } from "@/config/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteIndexable ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
