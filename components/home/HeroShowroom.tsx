import Link from "next/link";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { getProductoImagenPrincipal, type Producto } from "@/data/productos";

type Props = {
  featuredMoto?: Producto;
};

export default function HeroShowroom({ featuredMoto }: Props) {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-slate-950 px-4 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="inline-flex rounded-full border border-blue-300/30 bg-blue-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100">
            Concesionaria multimarca en Zarate
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Motos listas para elegir, financiar y retirar con asesoramiento real.
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-300">
            Compara modelos, colores y ficha tecnica. Te acompañamos para que elijas una unidad que cierre por uso, presupuesto y entrega.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-blue-100"
            >
              Ver catalogo
            </Link>
            <a
              href="https://wa.me/5493489696728"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:border-blue-300 hover:bg-white/10"
            >
              Hablar con un asesor
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
            {[
              ["0 km", "Unidades"],
              ["Cuotas", "Financiacion"],
              ["Showroom", "Atencion"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xl font-black">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {featuredMoto ? (
          <div className="relative rounded-lg border border-white/10 bg-white p-5 text-slate-950 shadow-2xl shadow-blue-950/30">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                  Unidad destacada
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">
                  {featuredMoto.nombre}
                </h2>
              </div>
              <Link
                href={`/catalogo/${featuredMoto.id}`}
                className="rounded-lg bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:bg-blue-700"
              >
                Ver
              </Link>
            </div>

            <div className="flex min-h-[320px] items-center justify-center rounded-lg bg-slate-50 p-8">
              <ImageWithSkeleton
                src={getProductoImagenPrincipal(featuredMoto.imagen)}
                alt={featuredMoto.nombre}
                className="flex h-full w-full items-center justify-center"
                imageClassName="block object-contain"
                imageStyle={{
                  maxHeight: "260px",
                  maxWidth: "100%",
                  width: "auto",
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
