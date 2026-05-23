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

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const getInitialVariant = (producto: Producto) =>
  producto.variantes?.find((variante) => variante.codigo === producto.codigo) ??
  producto.variantes?.[0] ??
  null;

export default function ProductDetail({
  producto,
  fichaTecnica,
  catalogAction,
}: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductoVariante | null>(
    () => getInitialVariant(producto),
  );

  const displayName = selectedVariant?.nombre ?? producto.nombre;
  const displayCode = selectedVariant?.codigo ?? producto.codigo;
  const galleryImages = producto.variantes?.length
    ? producto.variantes.map((variante) => variante.imagen)
    : producto.imagen;
  const selectedImage = selectedVariant?.imagen;

  const imageLabels = useMemo(
    () =>
      Object.fromEntries(
        producto.variantes?.map((variante) => [
          variante.imagen,
          `${variante.color} - ${variante.codigo}`,
        ]) ?? [],
      ),
    [producto.variantes],
  );

  const codigoTexto = displayCode ? `, codigo ${displayCode}` : "";
  const whatsappText = encodeURIComponent(
    `Hola! Quiero consultar por el producto ${displayName}${codigoTexto} y los planes de financiacion.`,
  );

  const selectImage = (image: string) => {
    const nextVariant = producto.variantes?.find(
      (variante) => variante.imagen === image,
    );

    if (nextVariant) {
      setSelectedVariant(nextVariant);
    }
  };

  return (
    <>
      <section
        className="grid gap-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8"
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
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            {producto.stock === "virtual" ? "Stock virtual" : "Moto disponible"}
          </p>
          {displayCode && (
            <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-400">
              Codigo {displayCode}
            </p>
          )}
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {displayName}
          </h1>
          <p className="mt-5 text-base font-medium leading-7 text-slate-600">
            {producto.descripcion}
          </p>
          <p className="mt-6 text-3xl font-black">
            {producto.precio === null
              ? "Consultar precio"
              : priceFormatter.format(producto.precio)}
          </p>

          {producto.variantes?.length ? (
            <div className="mt-6">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Color
              </p>
              <div className="flex flex-wrap gap-2">
                {producto.variantes.map((variante) => (
                  <button
                    key={variante.codigo}
                    type="button"
                    onClick={() => setSelectedVariant(variante)}
                    className={`rounded-lg border px-4 py-2 text-sm font-black transition ${
                      selectedVariant?.codigo === variante.codigo
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
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
              className="rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-950"
            >
              Consultar por WhatsApp
            </a>
            {catalogAction}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Especificaciones
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Ficha tecnica
            </h2>
          </div>
          {displayCode && (
            <p className="text-sm font-black uppercase tracking-wide text-slate-400">
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
          {fichaTecnica.map((item) => (
            <div
              key={`${item.etiqueta}-${item.valor}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <dt className="text-xs font-black uppercase tracking-wide text-slate-400">
                {item.etiqueta}
              </dt>
              <dd className="mt-2 text-sm font-black leading-5 text-slate-900">
                {item.valor}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
