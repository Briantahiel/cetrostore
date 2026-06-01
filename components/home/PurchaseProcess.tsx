const steps = [
  {
    number: "01",
    title: "Elegís el modelo",
    text: "Comparamos uso, altura, cilindrada y disponibilidad para que no compres a ciegas.",
  },
  {
    number: "02",
    title: "Simulamos la financiación",
    text: "Revisamos cuotas, anticipo y requisitos antes de avanzar con la reserva.",
  },
  {
    number: "03",
    title: "Retirás con papeles listos",
    text: "Coordinamos patentamiento, documentación y entrega para que salgas listo para circular.",
  },
];

export default function PurchaseProcess() {
  return (
    <section className="bg-slate-100 px-4 py-12 text-slate-950 dark:bg-slate-900 dark:text-slate-50 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700 dark:text-cyan-300">
              Compra simple
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Un proceso claro desde la consulta hasta la entrega
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
            Te acompañamos en cada paso para que sepas qué estás firmando,
            cuándo retirás y qué documentación necesitás.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:hover:border-cyan-400"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700 dark:text-cyan-300">
                Paso {step.number}
              </p>
              <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
