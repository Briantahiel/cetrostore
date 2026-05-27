import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetail from "@/components/catalogo/ProductDetail";
import BackButton from "@/components/ui/BackButton";
import { getProductos } from "@/data/catalog-store";
import { getFichaTecnicaProducto, productos } from "@/data/productos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const secondaryCatalogLinkClassName =
  "rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700";

export function generateStaticParams() {
  return productos.map((producto) => ({
    id: producto.id.toString(),
  }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const catalogProducts = await getProductos();
  const producto = catalogProducts.find((p) => p.id === Number(id));

  if (!producto) {
    notFound();
  }

  const fichaTecnica = getFichaTecnicaProducto(producto);

  return (
    <main className="flex-1 bg-slate-50 px-4 py-10 text-slate-950 sm:px-8 lg:px-10">
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
                  Ver catalogo
                </span>
              }
            >
              <BackButton
                label="Ver catalogo"
                className={secondaryCatalogLinkClassName}
              />
            </Suspense>
          }
        />
      </div>
    </main>
  );
}
