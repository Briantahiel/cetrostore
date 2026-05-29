import Link from "next/link";
import { getProductoImagenPrincipal, type ProductoVariante } from "@/data/productos";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

type Props = {
  id: number;
  codigo?: string;
  nombre: string;
  descripcion: string;
  imagen: string[];
  color?: string;
  stock?: "fisico" | "virtual";
  variantes?: ProductoVariante[];
  detailHref?: string;
  onOpen?: () => void;
};

export default function ProductCard({
  id,
  codigo,
  nombre,
  descripcion,
  imagen,
  color,
  stock = "fisico",
  variantes,
  detailHref = `/catalogo/${id}`,
  onOpen,
}: Props) {
  const whatsappText = encodeURIComponent(
    `Hola! Quiero consultar por el modelo ${nombre}${codigo ? `, codigo ${codigo}` : ""}. Podrían pasarme informacion sobre financiación y medios de pago?`
  );
  const isVirtualStock = stock === "virtual";
  const imagenPrincipal = getProductoImagenPrincipal(imagen);

  return (
    <article className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/10">
      <Link
        href={detailHref}
        onClick={onOpen}
        className="block bg-gradient-to-b from-slate-100 to-white p-4 transition hover:bg-blue-50"
      >
        <ImageWithSkeleton
          src={imagenPrincipal}
          alt={nombre}
          className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-white"
          imageClassName="block"
          imageStyle={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            width: "100%",
          }}
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">
            {isVirtualStock ? "Stock virtual" : "Moto disponible"}
          </p>
          {codigo && (
            <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-500">
              Codigo {codigo}
            </p>
          )}
        </div>
        <Link href={detailHref} onClick={onOpen} className="mt-3 block">
          <h3 className="text-xl font-black tracking-tight text-slate-950 transition hover:text-blue-700">
            {nombre}
          </h3>
        </Link>

        <p className="mt-3 flex-1 text-sm font-medium leading-6 text-slate-600">
          {descripcion}
        </p>

        {color || variantes?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {color ? (
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                {color}
              </span>
            ) : null}
            {variantes?.map((variante) => (
              <span
                key={variante.codigo}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black text-slate-600"
              >
                {variante.color}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href={detailHref}
            onClick={onOpen}
            className="flex items-center justify-center rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-black text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
            style={{ minHeight: "3rem" }}
          >
            Ver ficha
          </Link>
          <a
            href={`https://wa.me/5493489696728?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-slate-950"
            style={{ minHeight: "3rem" }}
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
