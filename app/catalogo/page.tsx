import { connection } from "next/server";
import ProductCatalog from "@/components/catalogo/ProductCatalog";
import { getProductos } from "@/data/catalog-store";

export default async function CatalogoPage() {
  await connection();

  const productos = await getProductos();

  return (
    <main className="flex-1 bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <ProductCatalog productos={productos} />
    </main>
  );
}
