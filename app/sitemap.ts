import type { MetadataRoute } from "next";
import { getProductos } from "@/data/catalog-store";
import { getProductoCanonicalPath } from "@/data/productos";
import { getBaseUrl } from "@/lib/admin-auth";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const productos = await getProductos();
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productos.map((producto) => ({
      url: new URL(getProductoCanonicalPath(producto), baseUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
