import { novedades } from "@/data/novedades";

export default function NewsSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Novedades
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Promociones y avisos importantes
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-6 text-slate-600">
            Hay eventos especiales y promociones que no querés perderte. Acá te contamos todo lo que tenés que saber.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {novedades.map((novedad) => (
            <article
              key={novedad.id}
              className="min-w-[240px] flex-1 rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm"
            >
              <span className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-black uppercase tracking-wide text-white">
                {novedad.etiqueta}
              </span>
              <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950">
                {novedad.titulo}
              </h3>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                {novedad.descripcion}
              </p>
              {/* <p className="mt-4 border-t border-slate-200 pt-4 text-xs font-black uppercase tracking-wide text-slate-500">
                {novedad.detalle}
              </p> */}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
