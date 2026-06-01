const highlights = [
  {
    eyebrow: "Cuotas",
    title: "Financiación",
    text: "Opciones a medida para comparar cuotas antes de reservar.",
  },
  {
    eyebrow: "Operación",
    title: "Entrega inmediata",
    text: "Confirmación de disponibilidad y documentación antes del retiro.",
  },
  {
    eyebrow: "Compra guiada",
    title: "Asesoramiento",
    text: "Te ayudamos a elegir el modelo que más se adapta a tu necesidad y estilo.",
  },
];

export default function SalesHighlights() {
  return (
    <section className="bg-white px-4 py-12 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Todo listo para decidir mejor
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="min-w-[240px] flex-1 rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-cyan-400 dark:hover:bg-slate-900"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700 dark:text-cyan-300">
                {item.eyebrow}
              </p>
              <h2 className="mt-2 text-lg font-black tracking-tight text-slate-950 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
