"use client";

import { useMemo, useState } from "react";
import ProductGallery from "@/components/catalogo/ProductGallery";
import type { FichaTecnicaItem, Producto, ProductoVariante } from "@/data/productos";
import type { ReactNode } from "react";

type Props = {
  producto: Producto;
  fichaTecnica: FichaTecnicaItem[];
  catalogAction?: ReactNode;
};

export default function ProductDetail({
  producto,
  fichaTecnica,
  catalogAction,
}: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductoVariante | null>(
    null,
  );
  const childVariants = useMemo(
    () =>
      producto.variantes?.filter(
        (variante) => !producto.codigo || variante.codigo !== producto.codigo,
      ) ?? [],
    [producto.codigo, producto.variantes],
  );

  const displayName = selectedVariant?.nombre ?? producto.nombre;
  const displayCode = selectedVariant?.codigo ?? producto.codigo;
  const displayDescription = selectedVariant?.descripcion ?? producto.descripcion;
  const displayStock = selectedVariant?.stock ?? producto.stock;
  const displayFichaTecnica = selectedVariant?.fichaTecnica?.length
    ? selectedVariant.fichaTecnica
    : fichaTecnica;
  const galleryImages = Array.from(
    new Set([...producto.imagen, ...childVariants.map((variante) => variante.imagen)]),
  );
  const selectedImage = selectedVariant?.imagen;

  const imageLabels = useMemo(
    () =>
      Object.fromEntries(
        childVariants.map((variante) => [
          variante.imagen,
          `${variante.color} - ${variante.codigo}`,
        ]),
      ),
    [childVariants],
  );

  const codigoTexto = displayCode ? `, código ${displayCode}` : "";
  const whatsappText = encodeURIComponent(
    `Hola! Quiero consultar por el modelo ${displayName}${codigoTexto} y los planes de financiación.`,
  );

  const selectImage = (image: string) => {
    const nextVariant = producto.variantes?.find(
      (variante) => variante.imagen === image,
    );

    if (nextVariant) {
      setSelectedVariant(nextVariant);
    } else if (producto.imagen.includes(image)) {
      setSelectedVariant(null);
    }
  };

  return (
    <>
      <section
        className="grid gap-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950 md:p-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <ProductGallery
          nombre={displayName}
          imagen={galleryImages}
          selectedImage={selectedImage}
          onSelectImage={selectImage}
          imageLabels={imageLabels}
        />

        <div className="flex flex-col justify-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700 dark:text-cyan-300">
            {displayStock === "virtual" ? "Stock virtual" : "Moto disponible"}
          </p>
          {displayCode && (
            <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-300">
              Código {displayCode}
            </p>
          )}
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {displayName}
          </h1>
          <p className="mt-5 text-base font-semibold leading-7 text-slate-700 dark:text-slate-300">
            {displayDescription}
          </p>
          {producto.color || childVariants.length ? (
            <div className="mt-6">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300">
                Color
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedVariant(null)}
                  className={`rounded-lg border px-4 py-2 text-sm font-black transition ${
                    selectedVariant === null
                      ? "border-blue-700 bg-blue-700 text-white dark:border-cyan-300 dark:bg-cyan-300 dark:text-slate-950"
                      : "border-slate-300 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:bg-slate-800"
                  }`}
                >
                  {producto.color ?? "Principal"}
                </button>
                {childVariants.map((variante) => (
                  <button
                    key={variante.codigo}
                    type="button"
                    onClick={() => setSelectedVariant(variante)}
                    className={`rounded-lg border px-4 py-2 text-sm font-black transition ${
                      selectedVariant?.codigo === variante.codigo
                        ? "border-blue-700 bg-blue-700 text-white dark:border-cyan-300 dark:bg-cyan-300 dark:text-slate-950"
                        : "border-slate-300 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {variante.color}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/5493489696728?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-950 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-white"
            >
              Consultar por WhatsApp
            </a>
            {catalogAction}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950 md:p-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700 dark:text-cyan-300">
              Especificaciones
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Ficha técnica
            </h2>
          </div>
          {displayCode && (
            <p className="text-sm font-black uppercase tracking-wide text-slate-700 dark:text-slate-300">
              {displayCode}
            </p>
          )}
        </div>

        <dl
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          }}
        >
          {displayFichaTecnica.map((item) => (
            <div
              key={`${item.etiqueta}-${item.valor}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
            >
              <dt className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-300">
                {item.etiqueta}
              </dt>
              <dd className="mt-2 text-sm font-black leading-5 text-slate-950 dark:text-white">
                {item.valor}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
