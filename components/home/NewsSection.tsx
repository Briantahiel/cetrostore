import type { Novedad } from "@/data/novedades";

type Props = {
  novedades: Novedad[];
};

export default function NewsSection({ novedades }: Props) {
  return (
    <section className="bg-white px-4 py-12 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700 dark:text-cyan-300">
              Novedades
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Promociones y avisos importantes
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
            Hay eventos especiales y promociones que no querés perderte. Acá
            te contamos todo lo que tenés que saber.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {novedades.map((novedad) => (
            <article
              key={novedad.id}
              className="min-w-[240px] flex-1 rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-black uppercase tracking-wide text-white dark:bg-cyan-300 dark:text-slate-950">
                {novedad.etiqueta}
              </span>
              <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                {novedad.titulo}
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                {novedad.descripcion}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
