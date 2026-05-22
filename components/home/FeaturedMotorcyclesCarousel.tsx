"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useMemo, useState } from "react";
import { productos } from "@/data/productos";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export default function FeaturedMotorcyclesCarousel() {
  const featuredProducts = useMemo(() => productos.slice(0, 5), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = featuredProducts[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((index) =>
      index === 0 ? featuredProducts.length - 1 : index - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((index) =>
      index === featuredProducts.length - 1 ? 0 : index + 1,
    );
  };

  if (!activeProduct) return null;

  return (
    <section className="bg-slate-100 px-4 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Motos destacadas
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Moto anterior"
              onClick={goToPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-xl font-black text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
            >
              {"<"}
            </button>
            <button
              type="button"
              aria-label="Moto siguiente"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-xl font-black text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
            >
              {">"}
            </button>
          </div>
        </div>

        <article className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-[0.75fr_1fr]">
          <div className="flex min-h-[220px] items-center justify-center border-b border-slate-200 bg-white p-6 md:border-b-0 md:border-r">
            <img
              src={activeProduct.imagen}
              alt={activeProduct.nombre}
              className="block object-contain"
              style={{ maxHeight: "170px", maxWidth: "100%", width: "auto" }}
            />
          </div>
          <div className="flex flex-col justify-center p-5 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Disponible
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
              {activeProduct.nombre}
            </h3>
            <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
              {activeProduct.descripcion}
            </p>
            <p className="mt-5 text-2xl font-black">
              {priceFormatter.format(activeProduct.precio)}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/catalogo/${activeProduct.id}`}
                className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-950"
              >
                Ver ficha
              </Link>
              <a
                href="https://wa.me/5493489696728"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
              >
                Consultar
              </a>
            </div>
          </div>
        </article>

        <div className="mt-4 flex justify-center gap-2">
          {featuredProducts.map((producto, index) => (
            <button
              key={producto.id}
              type="button"
              aria-label={`Ver ${producto.nombre}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-8 rounded-full transition ${
                activeIndex === index ? "bg-blue-600" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
