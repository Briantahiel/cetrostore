import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { permanentRedirect } from "next/navigation";
import { connection } from "next/server";
import Script from "next/script";
import { Suspense } from "react";
import ProductDetail from "@/components/catalogo/ProductDetail";
import BackButton from "@/components/ui/BackButton";
import { getProductos } from "@/data/catalog-store";
import {
  getFichaTecnicaProducto,
  getProductoCanonicalPath,
  getProductoImagenPrincipal,
  getProductoSlug,
  type Producto,
} from "@/data/productos";
import { getBaseUrl } from "@/lib/admin-auth";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    from?: string;
  }>;
};

const findProductoByParam = (productos: Producto[], param: string) => {
  const numericId = Number(param);

  if (Number.isFinite(numericId)) {
    return productos.find((producto) => producto.id === numericId);
  }

  return productos.find((producto) => getProductoSlug(producto) === param);
};

const getProductDescription = (producto: Producto) =>
  producto.descripcion.length > 155
    ? `${producto.descripcion.slice(0, 152).trim()}...`
    : producto.descripcion;

const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const catalogProducts = await getProductos();
  const producto = findProductoByParam(catalogProducts, id);

  if (!producto) {
    return {
      title: "Moto no encontrada | Cetromotos",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = getProductoCanonicalPath(producto);
  const canonicalUrl = new URL(canonicalPath, getBaseUrl()).toString();
  const imageUrl = new URL(
    getProductoImagenPrincipal(producto.imagen),
    getBaseUrl(),
  ).toString();

  return {
    title: `${producto.nombre} | Ficha tecnica y financiacion | Cetromotos`,
    description: getProductDescription(producto),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${producto.nombre} | Cetromotos`,
      description: getProductDescription(producto),
      url: canonicalUrl,
      siteName: "Cetromotos",
      images: [
        {
          url: imageUrl,
          alt: producto.nombre,
        },
      ],
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${producto.nombre} | Cetromotos`,
      description: getProductDescription(producto),
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  await connection();

  const { id } = await params;
  const query = await searchParams;
  const catalogProducts = await getProductos();
  const producto = findProductoByParam(catalogProducts, id);

  if (!producto) {
    notFound();
  }

  const canonicalPath = getProductoCanonicalPath(producto);
  if (id !== getProductoSlug(producto)) {
    const redirectPath = query?.from
      ? `${canonicalPath}?from=${encodeURIComponent(query.from)}`
      : canonicalPath;

    permanentRedirect(redirectPath);
  }

  const fichaTecnica = getFichaTecnicaProducto(producto);
  const canonicalUrl = new URL(canonicalPath, getBaseUrl()).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        name: producto.nombre,
        description: producto.descripcion,
        sku: producto.codigo,
        image: producto.imagen.map((image) =>
          new URL(image, getBaseUrl()).toString(),
        ),
        brand: {
          "@type": "Brand",
          name: producto.nombre.split(" ")[0],
        },
        offers: {
          "@type": "Offer",
          availability:
            producto.stock === "virtual"
              ? "https://schema.org/PreOrder"
              : "https://schema.org/InStock",
          priceCurrency: "ARS",
          price: producto.precio ?? undefined,
          url: canonicalUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: getBaseUrl(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Catalogo",
            item: new URL("/catalogo", getBaseUrl()).toString(),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: producto.nombre,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="flex-1 bg-slate-50 px-4 py-10 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Script
          id={`producto-json-ld-${producto.id}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <Suspense fallback={null}>
          <BackButton />
        </Suspense>

        <ProductDetail
          producto={producto}
          fichaTecnica={fichaTecnica}
        />
      </div>
    </main>
  );
}
