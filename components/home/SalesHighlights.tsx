const highlights = [
  {
    eyebrow: "Financiacion",
    title: "Cuotas claras antes de avanzar",
    text: "Revisamos alternativas y monto estimado para que compares sin perder tiempo.",
  },
  {
    eyebrow: "Disponibilidad",
    title: "Modelos y colores organizados",
    text: "Cada moto muestra sus variantes juntas, con ficha tecnica y consulta directa.",
  },
  {
    eyebrow: "Entrega",
    title: "Acompañamiento hasta el retiro",
    text: "Coordinamos documentacion, reserva y entrega con seguimiento personalizado.",
  },
];

export default function SalesHighlights() {
  return (
    <section className="bg-white px-4 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Compra guiada
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Informacion simple para decidir mejor
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-lg"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                {item.eyebrow}
              </p>
              <h3 className="mt-2 text-lg font-black tracking-tight text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
