import Link from "next/link";
import { getProductoImagenPrincipal, productos } from "@/data/productos";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const featuredMoto = productos[15] ?? productos[0];

export default function HeroShowroom() {
  return (
    <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#111827_48%,#f8fafc_48%,#ffffff_100%)] px-4 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
            Concesionaria multimarca
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Elegí tu próxima moto con entrega y financiación claras
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-300">
            Modelos urbanos, todo terreno y ruta con asesoramiento directo,
            disponibilidad confirmada y atención personalizada.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-300 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:bg-white"
            >
              Ver catálogo
              
            </Link>
            <a
              href="https://wa.me/5493489696728"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Consultar ahora
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-slate-950">
            {["Motos 0 km", "Financiacion", "Entrega inmediata"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-lg bg-white px-4 py-3 text-xs font-black uppercase tracking-wide shadow-sm"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-950 shadow-2xl shadow-slate-950/20">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Unidad destacada
              </p>
              <h2 className="mt-1 text-xl font-black tracking-tight">
                {featuredMoto.nombre}
              </h2>
            </div>
           <Link
  href={`/catalogo/${featuredMoto.id}`}
  className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-black uppercase tracking-wide text-emerald-700 transition hover:bg-emerald-100"
>
  Ver
</Link>
          </div>
          <div className="flex min-h-[300px] items-center justify-center bg-slate-50 p-8">
            <ImageWithSkeleton
              src={getProductoImagenPrincipal(featuredMoto.imagen)}
              alt={featuredMoto.nombre}
              className="flex h-full w-full items-center justify-center"
              imageClassName="block object-contain"
              imageStyle={{
                maxHeight: "230px",
                maxWidth: "100%",
                width: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
