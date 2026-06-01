const faqs = [
  {
    question: "¿Cómo puedo acceder a un crédito?",
    answer:
      "Tenés que ser mayor de edad y contar con un ingreso declarado: antigüedad laboral, jubilación, pensión o monotributo.",
  },
  {
    question: "¿Cuánto tarda?",
    answer: "La aprobación es inmediata, por sí o por no.",
  },
  {
    question: "¿Qué pasa si no me aprueban?",
    answer:
      "Podés intentar con el DNI de un familiar, amigo o pareja. También podés contactarnos para explorar otras opciones de financiamiento.",
  },
  {
    question: "¿Por cuánto tiempo es válida la aprobación?",
    answer:
      "Tu crédito aprobado es válido por 24 horas. Es importante que te contactes de inmediato para no perder la oportunidad.",
  },
  {
    question: "¿Cómo funciona la entrega de la moto?",
    answer:
      "Una vez aprobado el crédito, la entrega puede ser con la primera cuota o mediante un anticipo mayor, dependiendo del modelo elegido y las condiciones de financiación.",
  },
  {
    question: "¿Tengo que hacer el patentamiento por mi cuenta?",
    answer:
      "No. Nosotros nos encargamos de gestionar el patentamiento y la documentación necesaria para que la moto quede lista para circular. Solo te solicitaremos la información y documentación requerida para realizar el trámite.",
  },
];

export default function FinancingFaq() {
  return (
    <section className="bg-white px-4 py-12 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700 dark:text-cyan-300">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Créditos y aprobación
          </h2>
          <p className="mt-4 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
            Información básica para saber si podés avanzar con una financiación
            antes de reservar.
          </p>
          <p className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            Asesor comercial: Brian Gómez
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-slate-950 dark:text-white">
                {faq.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-lg font-black text-blue-700 transition group-open:rotate-45 dark:bg-slate-800 dark:text-cyan-300">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
