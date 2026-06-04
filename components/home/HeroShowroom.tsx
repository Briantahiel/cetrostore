import Link from "next/link";
import {
  getProductoCanonicalPath,
  getProductoImagenPrincipal,
  type Producto,
} from "@/data/productos";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

type Props = {
  productos: Producto[];
};

export default function HeroShowroom({ productos }: Props) {
  const featuredMoto = productos[0];

  if (!featuredMoto) return null;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#111827_66%,#e0f2fe_66%,#ffffff_100%)] px-4 py-14 text-white dark:border-slate-800 dark:bg-[linear-gradient(135deg,#020617_0%,#0f172a_68%,#164e63_68%,#020617_100%)] sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100 shadow-sm shadow-cyan-950/20">
            Concesionaria multimarca
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Elegí tu próxima moto con entrega y financiación claras
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-200">
            Modelos urbanos, todo terreno y ruta con asesoramiento directo y
            atención personalizada.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Ver catálogo
            </Link>
            <a
              href="https://wa.me/5493489696728"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-100"
            >
              Consultar ahora
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-950 shadow-2xl shadow-slate-950/25 ring-1 ring-white/40 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:ring-slate-700">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700 dark:text-cyan-300">
                Unidad destacada
              </p>
              <h2 className="mt-1 text-xl font-black tracking-tight">
                {featuredMoto.nombre}
              </h2>
            </div>
            <Link
              href={getProductoCanonicalPath(featuredMoto)}
              className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-black uppercase tracking-wide text-emerald-800 transition hover:bg-emerald-200 dark:bg-emerald-400/15 dark:text-emerald-200 dark:hover:bg-emerald-400/25"
            >
              Ver
            </Link>
          </div>
          <div className="flex min-h-[260px] items-center justify-center bg-white p-4 sm:min-h-[300px] sm:p-8">
            <ImageWithSkeleton
              src={getProductoImagenPrincipal(featuredMoto.imagen)}
              alt={featuredMoto.nombre}
              className="flex aspect-[4/3] w-full items-center justify-center"
              imageClassName="block object-contain"
              imageStyle={{
                maxHeight: "100%",
                maxWidth: "100%",
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
