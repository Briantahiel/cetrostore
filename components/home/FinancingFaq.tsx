const faqs = [
  {
    question: "C\u00f3mo puedo acceder a un cr\u00e9dito?",
    answer:
      "Ten\u00e9s que ser mayor de edad y contar con un ingreso declarado: antig\u00fcedad laboral, jubilaci\u00f3n, pensi\u00f3n o monotributo.",
  },
  {
    question: "Cu\u00e1nto tarda?",
    answer: "La aprobaci\u00f3n es inmediata, por s\u00ed o por no.",
  },
  {
    question: "Si no me aprueban?",
    answer:
      "Pod\u00e9s intentar con el DNI de un familiar, amigo o pareja. Tambi\u00e9n pod\u00e9s contactarnos para explorar otras opciones de financiamiento.",
  },
  {
    question: "Por cu\u00e1nto tiempo es v\u00e1lida la aprobaci\u00f3n?",
    answer:
      "Tu cr\u00e9dito aprobado es v\u00e1lido por 24 horas. Es importante que te contactes de inmediato para no perder la oportunidad.",
  },
];

export default function FinancingFaq() {
  return (
    <section className="bg-white px-4 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Cr{"\u00e9"}ditos y aprobaci{"\u00f3"}n
          </h2>
          <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
            Informaci{"\u00f3"}n b{"\u00e1"}sica para saber si pod{"\u00e9"}s
            avanzar con una financiaci{"\u00f3"}n antes de reservar.
          </p>
          <p className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-800">
            Asesor comercial: Brian G{"\u00f3"}mez
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-slate-950">
                {faq.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-lg font-black text-blue-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
