/* eslint-disable @next/next/no-img-element */
import { productos } from "@/data/productos";

const showroomPhotos = productos.slice(5, 11);

export default function PhotoSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Showroom
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Motos listas para ver
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-6 text-slate-600">
            Una vista rapida de modelos para comparar estilo, posicion de
            manejo y uso recomendado.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {showroomPhotos.map((producto) => (
            <figure
              key={producto.id}
              className="min-w-[220px] flex-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm"
            >
              <div className="flex h-44 items-center justify-center p-5">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="block object-contain"
                  style={{ maxHeight: "100%", maxWidth: "100%", width: "auto" }}
                />
              </div>
              <figcaption className="border-t border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700">
                {producto.nombre}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
