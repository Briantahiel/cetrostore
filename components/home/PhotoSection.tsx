import { getProductoImagenPrincipal, productos } from "@/data/productos";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

const showroomPhotos = productos.slice(5, 11);

export default function PhotoSection() {
  return (
    <section className="bg-white px-4 py-12 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700 dark:text-cyan-300">
              Showroom
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Motos listas para ver
            </h2>
          </div>
          <p className="max-w-md text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
            Una selección de los modelos más vendidos.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {showroomPhotos.map((producto) => (
            <figure
              key={producto.id}
              className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex aspect-[4/3] items-center justify-center p-4 sm:p-5">
                <ImageWithSkeleton
                  src={getProductoImagenPrincipal(producto.imagen)}
                  alt={producto.nombre}
                  className="flex h-full w-full items-center justify-center"
                  imageClassName="block object-contain"
                  imageStyle={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    width: "100%",
                  }}
                />
              </div>
              <figcaption className="border-t border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
                {producto.nombre}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
