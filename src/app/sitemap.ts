import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/origin";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteOrigin ? [{ url: new URL("/", siteOrigin).href }] : [];
}
