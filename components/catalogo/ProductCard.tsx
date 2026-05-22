/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Props = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
};

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export default function ProductCard({
  id,
  nombre,
  descripcion,
  precio,
  imagen,
}: Props) {
  const whatsappText = encodeURIComponent(
    `Hola! Quiero consultar por el producto ${nombre}. Podrian pasarme informacion sobre financiacion y medios de pago?`
  );

  return (
    <article className="flex h-full min-h-[430px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      <Link
        href={`/catalogo/${id}`}
        className="block bg-slate-100 p-4 transition hover:bg-blue-50"
      >
        <div
          className="flex items-center justify-center overflow-hidden rounded-lg bg-white"
          style={{ height: "11rem" }}
        >
          <img
            src={imagen}
            alt={nombre}
            className="block"
            style={{
              height: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              width: "auto",
            }}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          Moto disponible
        </p>
        <Link href={`/catalogo/${id}`} className="mt-3 block">
          <h3 className="text-xl font-black tracking-tight text-slate-950 transition hover:text-blue-700">
            {nombre}
          </h3>
        </Link>

        <p className="mt-3 flex-1 text-sm font-medium leading-6 text-slate-600">
          {descripcion}
        </p>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Desde
            </p>
            <p className="mt-1 text-2xl font-black text-slate-950">
              {priceFormatter.format(precio)}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href={`/catalogo/${id}`}
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
