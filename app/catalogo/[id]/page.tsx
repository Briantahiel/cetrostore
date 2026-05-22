import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/catalogo/ProductGallery";
import BackButton from "@/components/ui/BackButton";
import { productos } from "@/data/productos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function generateStaticParams() {
  return productos.map((producto) => ({
    id: producto.id.toString(),
  }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const producto = productos.find((p) => p.id === Number(id));
  const codigoTexto = producto?.codigo ? `, codigo ${producto.codigo}` : "";
  const whatsappText = encodeURIComponent(
    `Hola! Quiero consultar por el producto ${
      producto?.nombre ?? ""
    }${codigoTexto} y los planes de financiacion.`,
  );

  if (!producto) {
    notFound();
  }

  return (
    <main className="flex-1 bg-slate-50 px-4 py-10 text-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <BackButton />

        <section
          className="grid gap-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <ProductGallery nombre={producto.nombre} imagen={producto.imagen} />

          <div className="flex flex-col justify-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              {producto.stock === "virtual" ? "Stock virtual" : "Moto disponible"}
            </p>
            {producto.codigo && (
              <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-400">
                Codigo {producto.codigo}
              </p>
            )}
            <h1 className="mt-3 text-4xl font-black tracking-tight">
              {producto.nombre}
            </h1>
            <p className="mt-5 text-base font-medium leading-7 text-slate-600">
              {producto.descripcion}
            </p>
            <p className="mt-6 text-3xl font-black">
              {producto.precio === null
                ? "Consultar precio"
                : priceFormatter.format(producto.precio)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/5493489696728?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-950"
              >
                Consultar por WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
              >
                Ver catalogo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
