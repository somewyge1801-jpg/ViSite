import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/origin";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: siteOrigin ? ["/concepts/", "/concept-a/", "/concept-b/", "/concept-c/"] : "/" },
    sitemap: siteOrigin ? new URL("/sitemap.xml", siteOrigin).href : undefined,
  };
}
