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
    text: "Te ayudamos a elegir el modelo que más se adapta a tu necesidad y estilo",
  },
];

export default function SalesHighlights() {
  return (
    <section className="bg-white px-4 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Todo listo para decidir mejor
            </h2>
          </div>
          {/* <p className="max-w-md text-sm font-medium leading-6 text-slate-600">
            La idea es que sepas el precio, formas de pago y la disponibilidad antes
            de avanzar.
          </p> */}
        </div>

        <div className="flex flex-wrap gap-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="min-w-[240px] flex-1 rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                {item.eyebrow}
              </p>
              <h2 className="text-lg font-black tracking-tight text-slate-950">
                {item.title}
              </h2>
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
