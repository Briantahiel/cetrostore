import Link from "next/link";
import {
  deleteNovedadAction,
  deleteProductoAction,
  saveNovedadAction,
  saveProductoAction,
} from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { getFichaTecnicaProducto } from "@/data/productos";
import { getNovedades, getProductos } from "@/data/catalog-store";
import { getAdminPath } from "@/lib/admin-auth";
import { requireAdminSession } from "@/lib/admin-session";
import type { Novedad } from "@/data/novedades";
import type { Producto } from "@/data/productos";

type Props = {
  searchParams: Promise<{
    tab?: string;
    moto?: string;
    novedad?: string;
  }>;
};

const fieldClassName =
  "rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100";
const labelClassName = "flex flex-col gap-2 text-sm font-black text-slate-800";
const sectionClassName = "rounded-lg border border-slate-200 bg-white p-5 shadow-sm";

const jsonText = (value: unknown) => JSON.stringify(value ?? [], null, 2);

function ProductForm({ producto }: { producto?: Producto }) {
  const fichaTecnica = producto?.fichaTecnica ?? (producto ? getFichaTecnicaProducto(producto) : []);
  const adminPath = getAdminPath();

  return (
    <form action={saveProductoAction} className={`${sectionClassName} grid gap-4`}>
      <input type="hidden" name="id" value={producto?.id ?? ""} />
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          {producto ? `Editando moto #${producto.id}` : "Nueva moto"}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight">
          {producto ? producto.nombre : "Cargar moto"}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Nombre
          <input name="nombre" required defaultValue={producto?.nombre} className={fieldClassName} />
        </label>
        <label className={labelClassName}>
          Codigo
          <input name="codigo" defaultValue={producto?.codigo} className={fieldClassName} />
        </label>
        <label className={labelClassName}>
          Precio
          <input
            name="precio"
            type="number"
            min="0"
            step="1"
            defaultValue={producto?.precio ?? ""}
            className={fieldClassName}
            placeholder="Vacio si es a consultar"
          />
        </label>
        <label className={labelClassName}>
          Stock
          <select name="stock" defaultValue={producto?.stock ?? "virtual"} className={fieldClassName}>
            <option value="virtual">Virtual</option>
            <option value="fisico">Fisico</option>
          </select>
        </label>
      </div>

      <label className={labelClassName}>
        Descripcion
        <textarea
          name="descripcion"
          required
          rows={5}
          defaultValue={producto?.descripcion}
          className={fieldClassName}
        />
      </label>

      <label className={labelClassName}>
        Imagenes
        <textarea
          name="imagen"
          required
          rows={4}
          defaultValue={producto?.imagen.join("\n")}
          className={fieldClassName}
          placeholder="/motos/archivo.webp"
        />
      </label>

      <label className={labelClassName}>
        Variantes
        <textarea
          name="variantes"
          rows={7}
          defaultValue={jsonText(producto?.variantes)}
          className={`${fieldClassName} font-mono`}
        />
      </label>

      <label className={labelClassName}>
        Ficha tecnica
        <textarea
          name="fichaTecnica"
          rows={8}
          defaultValue={jsonText(fichaTecnica)}
          className={`${fieldClassName} font-mono`}
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-950"
        >
          Guardar moto
        </button>
        {producto ? (
          <Link
            href={`${adminPath}?tab=motos`}
            className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
          >
            Nueva moto
          </Link>
        ) : null}
      </div>
    </form>
  );
}

function NewsForm({ novedad }: { novedad?: Novedad }) {
  const adminPath = getAdminPath();

  return (
    <form action={saveNovedadAction} className={`${sectionClassName} grid gap-4`}>
      <input type="hidden" name="id" value={novedad?.id ?? ""} />
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          {novedad ? `Editando novedad #${novedad.id}` : "Nueva novedad"}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight">
          {novedad ? novedad.titulo : "Cargar novedad"}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Etiqueta
          <input name="etiqueta" required defaultValue={novedad?.etiqueta} className={fieldClassName} />
        </label>
        <label className={labelClassName}>
          Titulo
          <input name="titulo" required defaultValue={novedad?.titulo} className={fieldClassName} />
        </label>
      </div>
      <label className={labelClassName}>
        Descripcion
        <textarea
          name="descripcion"
          required
          rows={4}
          defaultValue={novedad?.descripcion}
          className={fieldClassName}
        />
      </label>
      <label className={labelClassName}>
        Detalle
        <textarea
          name="detalle"
          rows={3}
          defaultValue={novedad?.detalle}
          className={fieldClassName}
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-950"
        >
          Guardar novedad
        </button>
        {novedad ? (
          <Link
            href={`${adminPath}?tab=novedades`}
            className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
          >
            Nueva novedad
          </Link>
        ) : null}
      </div>
    </form>
  );
}

export default async function AdminPage({ searchParams }: Props) {
  const session = await requireAdminSession();
  const params = await searchParams;
  const adminPath = getAdminPath();
  const activeTab = params.tab === "novedades" ? "novedades" : "motos";
  const [productos, novedades] = await Promise.all([getProductos(), getNovedades()]);
  const selectedProducto = productos.find((producto) => producto.id === Number(params.moto));
  const selectedNovedad = novedades.find((novedad) => novedad.id === Number(params.novedad));

  return (
    <main className="flex-1 bg-slate-50 px-4 py-10 text-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-900">
              Administracion
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Catalogo y novedades
            </h1>
            <p className="mt-2 text-xs font-bold text-slate-500">
              Sesion: {session.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`${adminPath}?tab=motos`}
              className={`rounded-lg px-4 py-3 text-sm font-black transition ${
                activeTab === "motos" ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              Motos
            </Link>
            <Link
              href={`${adminPath}?tab=novedades`}
              className={`rounded-lg px-4 py-3 text-sm font-black transition ${
                activeTab === "novedades" ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              Novedades
            </Link>
            <form action="/api/admin-auth/logout" method="post">
              <button
                type="submit"
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                Salir
              </button>
            </form>
          </div>
        </div>

        {activeTab === "motos" ? (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className={sectionClassName}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black tracking-tight">Motos</h2>
                <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">
                  {productos.length}
                </span>
              </div>
              <div className="grid max-h-[720px] gap-3 overflow-auto pr-1">
                {productos.map((producto) => (
                  <article key={producto.id} className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                      #{producto.id} {producto.codigo}
                    </p>
                    <h3 className="mt-1 text-base font-black">{producto.nombre}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`${adminPath}?tab=motos&moto=${producto.id}`}
                        className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-black text-blue-700 transition hover:bg-blue-50"
                      >
                        Editar
                      </Link>
                      <DeleteButton
                        action={deleteProductoAction}
                        id={producto.id}
                        label="Eliminar"
                        name={producto.nombre}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <ProductForm producto={selectedProducto} />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className={sectionClassName}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black tracking-tight">Novedades</h2>
                <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">
                  {novedades.length}
                </span>
              </div>
              <div className="grid gap-3">
                {novedades.map((novedad) => (
                  <article key={novedad.id} className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                      #{novedad.id} {novedad.etiqueta}
                    </p>
                    <h3 className="mt-1 text-base font-black">{novedad.titulo}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`${adminPath}?tab=novedades&novedad=${novedad.id}`}
                        className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-black text-blue-700 transition hover:bg-blue-50"
                      >
                        Editar
                      </Link>
                      <DeleteButton
                        action={deleteNovedadAction}
                        id={novedad.id}
                        label="Eliminar"
                        name={novedad.titulo}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <NewsForm novedad={selectedNovedad} />
          </div>
        )}
      </div>
    </main>
  );
}
