"use client";

import { FormEvent, useState } from "react";

const whatsappNumber = "5493489696728";

const initialForm = {
  nombre: "",
  dni: "",
  genero: "",
  // ingreso: "",
  // telefono: "",
};

export default function CreditCheckSection() {
  const [form, setForm] = useState(initialForm);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      "Hola Brian, quiero consultar mi estado crediticio para financiar una moto.",
      "",
      `Me llamo: ${form.nombre}`,
      `DNI: ${form.dni}`,
      `G\u00e9nero: ${form.genero}`,
      // `Ingreso declarado: ${form.ingreso}`,
      // form.telefono ? `Telefono: ${form.telefono}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="bg-slate-950 px-4 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
            Consulta crediticia
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Revisamos tu cr{"\u00e9"}dito antes de elegir la moto
          </h2>
          <p className="mt-4 text-sm font-medium leading-6 text-slate-300">
            Completa tus datos y se abre WhatsApp con el mensaje listo para
            enviar. Te atiende Brian G{"\u00f3"}mez, asesor comercial.
          </p>
          <div className="mt-6 rounded-lg border border-cyan-300/20 bg-white/5 p-4 text-sm font-bold leading-6 text-slate-200">
            La aprobaci{"\u00f3"}n es inmediata por s{"\u00ed"} o por no. Si
            califica, el cr{"\u00e9"}dito queda disponible por 24 horas.
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-white/10 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/30"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label
              htmlFor="credit-name"
              className="flex flex-col gap-2 text-sm font-black"
            >
              Nombre y apellido
              <input
                id="credit-name"
                name="nombre"
                required
                type="text"
                value={form.nombre}
                onChange={(event) => updateField("nombre", event.target.value)}
                placeholder="Ej: Juan Perez"
                className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label
              htmlFor="credit-dni"
              className="flex flex-col gap-2 text-sm font-black"
            >
              DNI
              <input
                id="credit-dni"
                name="dni"
                required
                inputMode="numeric"
                minLength={7}
                maxLength={9}
                value={form.dni}
                onChange={(event) => updateField("dni", event.target.value)}
                placeholder="Ej: 30111222"
                className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label
              htmlFor="credit-gender"
              className="flex flex-col gap-2 text-sm font-black"
            >
              G{"\u00e9"}nero
              <select
                id="credit-gender"
                name="genero"
                required
                value={form.genero}
                onChange={(event) => updateField("genero", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </label>

            {/* <label
              htmlFor="credit-income"
              className="flex flex-col gap-2 text-sm font-black"
            >
              Ingreso declarado
              <select
                id="credit-income"
                name="ingreso"
                required
                value={form.ingreso}
                onChange={(event) => updateField("ingreso", event.target.value)}
                className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Seleccionar</option>
                <option value="Antiguedad laboral">Antiguedad laboral</option>
                <option value="Jubilacion">Jubilacion</option>
                <option value="Pension">Pension</option>
                <option value="Monotributo">Monotributo</option>
              </select>
            </label> */}

            {/* <label
              htmlFor="credit-phone"
              className="flex flex-col gap-2 text-sm font-black sm:col-span-2"
            >
              Telefono
              <input
                id="credit-phone"
                name="telefono"
                type="tel"
                value={form.telefono}
                onChange={(event) =>
                  updateField("telefono", event.target.value)
                }
                placeholder="Opcional"
                className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label> */}
          </div>

          <button
            type="submit"
            className="mt-5 flex min-h-12 w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-950"
          >
            Enviar consulta por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
