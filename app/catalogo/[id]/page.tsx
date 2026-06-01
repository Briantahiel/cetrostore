import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import ProductDetail from "@/components/catalogo/ProductDetail";
import BackButton from "@/components/ui/BackButton";
import { getProductos } from "@/data/catalog-store";
import { getFichaTecnicaProducto } from "@/data/productos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const secondaryCatalogLinkClassName =
  "rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-800 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-600 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:bg-slate-900 dark:hover:text-cyan-300";

export default async function ProductPage({ params }: Props) {
  await connection();

  const { id } = await params;
  const catalogProducts = await getProductos();
  const producto = catalogProducts.find((p) => p.id === Number(id));

  if (!producto) {
    notFound();
  }

  const fichaTecnica = getFichaTecnicaProducto(producto);

  return (
    <main className="flex-1 bg-slate-50 px-4 py-10 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={null}>
          <BackButton />
        </Suspense>

        <ProductDetail
          producto={producto}
          fichaTecnica={fichaTecnica}
          catalogAction={
            <Suspense
              fallback={
                <span
                  className={secondaryCatalogLinkClassName}
                  style={{ minHeight: "2.75rem" }}
                >
                  Ver catálogo
                </span>
              }
            >
              <BackButton
                label="Ver catálogo"
                className={secondaryCatalogLinkClassName}
              />
            </Suspense>
          }
        />
      </div>
    </main>
  );
}
