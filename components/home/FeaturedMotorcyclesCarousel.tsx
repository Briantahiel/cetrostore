"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getProductoCanonicalPath,
  getProductoImagenPrincipal,
  type Producto,
} from "@/data/productos";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

type Props = {
  productos: Producto[];
};

export default function FeaturedMotorcyclesCarousel({ productos }: Props) {
  const featuredProducts = useMemo(
    () => productos.filter((producto) => !producto.vendido).slice(0, 5),
    [productos],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  const activeProduct = featuredProducts[activeIndex];
  const activeProductPath = activeProduct
    ? getProductoCanonicalPath(activeProduct)
    : "";

  const goToPrevious = () => {
    setShareStatus("idle");
    setActiveIndex((index) =>
      index === 0 ? featuredProducts.length - 1 : index - 1,
    );
  };

  const goToNext = () => {
    setShareStatus("idle");
    setActiveIndex((index) =>
      index === featuredProducts.length - 1 ? 0 : index + 1,
    );
  };

  const shareActiveProduct = async () => {
    if (!activeProduct) return;

    const url = new URL(activeProductPath, window.location.origin).toString();
    const shareData = {
      title: activeProduct.nombre,
      text: `Mirá esta moto: ${activeProduct.nombre}`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 2200);
    } catch {
      setShareStatus("idle");
    }
  };

  if (!activeProduct) return null;

  return (
    <section className="bg-slate-100 px-4 py-12 text-slate-950 dark:bg-slate-900 dark:text-slate-50 sm:px-8 lg:px-10">
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
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-xl font-black text-slate-800 shadow-sm transition hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              {"<"}
            </button>
            <button
              type="button"
              aria-label="Moto siguiente"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-xl font-black text-slate-800 shadow-sm transition hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              {">"}
            </button>
          </div>
        </div>

        <article className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-950 md:grid-cols-[0.75fr_1fr]">
          <div className="flex min-h-[220px] items-center justify-center border-b border-slate-200 bg-white p-4 dark:border-slate-700 sm:p-6 md:border-b-0 md:border-r">
            <ImageWithSkeleton
              src={getProductoImagenPrincipal(activeProduct.imagen)}
              alt={activeProduct.nombre}
              frame="product"
              className="flex aspect-[4/3] w-full items-center justify-center"
              imageClassName="block object-contain"
              imageStyle={{
                maxHeight: "100%",
                maxWidth: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className="flex flex-col justify-center p-5 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700 dark:text-cyan-300">
              {activeProduct.disponibleSucursal ? "En sucursal" : "Disponible"}
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
              {activeProduct.nombre}
            </h3>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
              {activeProduct.descripcion}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={activeProductPath}
                className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-950 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-white"
              >
                Ver ficha
              </Link>
              <a
                href="https://wa.me/5493489696728"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-600 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:bg-slate-900 dark:hover:text-cyan-300"
              >
                Consultar
              </a>
              <button
                type="button"
                onClick={shareActiveProduct}
                className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-600 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:bg-slate-900 dark:hover:text-cyan-300"
              >
                {shareStatus === "copied" ? "Enlace copiado" : "Compartir"}
              </button>
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
                activeIndex === index
                  ? "bg-blue-700 dark:bg-cyan-300"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
