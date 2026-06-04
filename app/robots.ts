import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/admin-auth";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/catalogo", "/catalogo/"],
        disallow: ["/admin", "/api/", "/panel-cetromotos"],
      },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
