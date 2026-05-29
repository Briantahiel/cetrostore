import Link from "next/link";
import { getProductoImagenPrincipal, type ProductoVariante } from "@/data/productos";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

type Props = {
  id: number;
  codigo?: string;
  nombre: string;
  descripcion: string;
  imagen: string[];
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
    <article className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      <Link
        href={detailHref}
        onClick={onOpen}
        className="block bg-slate-100 p-4 transition hover:bg-blue-50"
      >
        <ImageWithSkeleton
          src={imagenPrincipal}
          alt={nombre}
          className="flex items-center justify-center rounded-lg bg-white"
          style={{ height: "11rem" }}
          imageClassName="block"
          imageStyle={{
            height: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            width: "auto",
          }}
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          {isVirtualStock ? "Stock virtual" : "Moto disponible"}
        </p>
        {codigo && (
          <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-400">
            Codigo {codigo}
          </p>
        )}
        <Link href={detailHref} onClick={onOpen} className="mt-3 block">
          <h3 className="text-xl font-black tracking-tight text-slate-950 transition hover:text-blue-700">
            {nombre}
          </h3>
        </Link>

        <p className="mt-3 flex-1 text-sm font-medium leading-6 text-slate-600">
          {descripcion}
        </p>

        {variantes?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {variantes.map((variante) => (
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
