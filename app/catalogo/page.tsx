import type { Metadata } from "next";
import { connection } from "next/server";
import ProductCatalog from "@/components/catalogo/ProductCatalog";
import { getProductos } from "@/data/catalog-store";

export const metadata: Metadata = {
  title: "Catalogo de motos en Zarate",
  description:
    "Explora motos disponibles, fichas tecnicas, marcas, cilindradas y opciones de financiacion en Cetromotos.",
  alternates: {
    canonical: "/catalogo",
  },
  openGraph: {
    title: "Catalogo de motos | Cetromotos",
    description:
      "Motos urbanas, scooters, street y todo terreno con consulta directa por WhatsApp.",
    url: "/catalogo",
    type: "website",
  },
};

export default async function CatalogoPage() {
  await connection();

  const productos = await getProductos();

  return (
    <main className="flex-1 bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <ProductCatalog productos={productos} />
    </main>
  );
}
