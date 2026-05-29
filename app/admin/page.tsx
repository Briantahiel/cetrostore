import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";
import {
  deleteNovedadAction,
  deleteProductoAction,
  saveNovedadAction,
  saveProductoAction,
} from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { getFichaTecnicaProducto } from "@/data/productos";
import { getNovedades, getProductos } from "@/data/catalog-store";
import { getAdminPath } from "@/lib/admin-auth";
import { requireAdminSession } from "@/lib/admin-session";
import type { Novedad } from "@/data/novedades";
import type { Producto, ProductoVariante } from "@/data/productos";

type Props = {
  searchParams: Promise<{
    tab?: string;
    moto?: string;
    variant?: string;
    novedad?: string;
  }>;
};

const fieldClassName =
  "rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100";
const labelClassName = "flex flex-col gap-2 text-sm font-black text-slate-800";
const sectionClassName = "rounded-lg border border-slate-200 bg-white p-5 shadow-sm";

const getGalleryImages = async (productos: Producto[]) => {
  const motosDirectory = path.join(process.cwd(), "public", "motos");
  const productImages = productos.flatMap((producto) => [
    ...producto.imagen,
    ...(producto.variantes?.map((variante) => variante.imagen) ?? []),
  ]);

  try {
    const files = await fs.readdir(motosDirectory);
    const publicImages = files
      .filter((file) => /\.(?:avif|gif|jpe?g|png|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b))
      .map((file) => `/motos/${file}`);

    return Array.from(new Set([...productImages, ...publicImages])).filter(Boolean);
  } catch {
    return Array.from(new Set(productImages)).filter(Boolean);
  }
};

function ImageGalleryField({
  galleryImages,
  selectedImages,
  single = false,
}: {
  galleryImages: string[];
  selectedImages: string[];
  single?: boolean;
}) {
  const inputType = single ? "radio" : "checkbox";
  const inputName = single ? "imagenSeleccionada" : "imagenes";

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-black text-slate-800">Galeria de la app</p>
        <span className="text-xs font-black uppercase tracking-wide text-slate-400">
          {single ? "Elegir una" : "Marcar las que usa"}
        </span>
      </div>
      <p className="mb-3 text-xs font-bold text-slate-500">
        Para quitar una imagen de esta moto, dejala sin marcar y guarda.
      </p>
      <div className="grid max-h-72 grid-cols-2 gap-3 overflow-auto pr-1 sm:grid-cols-3">
        {galleryImages.map((image) => (
          <label
            key={image}
            className="group grid cursor-pointer gap-2 rounded-lg border border-slate-200 bg-white p-2 text-xs font-black text-slate-600 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <input
              type={inputType}
              name={inputName}
              value={image}
              defaultChecked={selectedImages.includes(image)}
              className="sr-only peer"
            />
            <ImageWithSkeleton
              src={image}
              alt={image}
              className="flex h-24 items-center justify-center rounded-md bg-slate-100"
              imageClassName="block"
              imageStyle={{
                height: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                width: "auto",
              }}
            />
            <span className="break-all rounded-md px-2 py-1 peer-checked:bg-blue-600 peer-checked:text-white">
              {image.startsWith("/motos/") ? image.replace("/motos/", "") : "Imagen subida"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

const emptyFichaRows = Array.from({ length: 6 }, () => ({
  etiqueta: "",
  valor: "",
}));

function TechnicalSheetFields({ items }: { items: Array<{ etiqueta: string; valor: string }> }) {
  const rows = [...items, ...emptyFichaRows];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-4 flex flex-col gap-1">
        <p className="text-sm font-black text-slate-800">Ficha tecnica</p>
        <p className="text-xs font-bold text-slate-500">
          Completa una fila por dato. Ejemplo: Cilindrada / 110 cc.
        </p>
      </div>
      <div className="grid gap-3">
        {rows.map((item, index) => (
          <div key={`${item.etiqueta}-${index}`} className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
            <input
              name="fichaEtiqueta"
              defaultValue={item.etiqueta}
              className={fieldClassName}
              placeholder="Cilindrada"
            />
            <input
              name="fichaValor"
              defaultValue={item.valor}
              className={fieldClassName}
              placeholder="110 cc"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const emptyVariantRows = Array.from({ length: 4 }, () => ({
  codigo: "",
  nombre: "",
  color: "",
  imagen: "",
}));

function VariantFields({
  variants,
  galleryImages,
}: {
  variants: ProductoVariante[];
  galleryImages: string[];
}) {
  const rows = [...variants, ...emptyVariantRows];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-4 flex flex-col gap-1">
        <p className="text-sm font-black text-slate-800">Variantes por color</p>
        <p className="text-xs font-bold text-slate-500">
          Usa una fila por color. Si la moto no tiene variantes, deja estas filas vacias.
        </p>
      </div>
      <div className="grid gap-3">
        {rows.map((variant, index) => (
          <div key={`${variant.codigo}-${index}`} className="grid gap-3 rounded-lg bg-slate-50 p-3">
            <div className="grid gap-3 md:grid-cols-3">
              <input
                name="varianteColor"
                defaultValue={variant.color}
                className={fieldClassName}
                placeholder="Rojo"
              />
              <input
                name="varianteCodigo"
                defaultValue={variant.codigo}
                className={fieldClassName}
                placeholder="MO0808"
              />
              <input
                name="varianteNombre"
                defaultValue={variant.nombre}
                className={fieldClassName}
                placeholder="Honda Wave roja"
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <select
                name="varianteImagenGaleria"
                defaultValue={variant.imagen}
                className={fieldClassName}
              >
                <option value="">Elegir imagen de la app</option>
                {galleryImages.map((image) => (
                  <option key={image} value={image}>
                    {image.startsWith("/motos/")
                      ? image.replace("/motos/", "")
                      : "Imagen subida"}
                  </option>
                ))}
              </select>
              <input
                name="varianteImagenArchivo"
                type="file"
                accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
                className={`${fieldClassName} file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-black file:text-white`}
              />
            </div>
            <input
              name="varianteImagen"
              defaultValue={variant.imagen}
              className={fieldClassName}
              placeholder="/motos/honda-wave-roja.jpg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductForm({
  producto,
  selectedVariant,
  galleryImages,
}: {
  producto?: Producto;
  selectedVariant?: ProductoVariante;
  galleryImages: string[];
}) {
  const childVariants = (producto?.variantes ?? []).filter(
    (variant) => !producto?.codigo || variant.codigo !== producto.codigo,
  );
  const fichaTecnica =
    selectedVariant?.fichaTecnica ??
    producto?.fichaTecnica ??
    (producto ? getFichaTecnicaProducto(producto) : []);
  const adminPath = getAdminPath();
  const isEditingVariant = Boolean(producto && selectedVariant);
  const selectedImages = selectedVariant
    ? [selectedVariant.imagen]
    : (producto?.imagen ?? []);
  const displayProducto = selectedVariant
    ? {
        ...producto,
        codigo: selectedVariant.codigo,
        nombre: selectedVariant.nombre,
        color: selectedVariant.color,
        descripcion: selectedVariant.descripcion ?? producto?.descripcion,
        precio: selectedVariant.precio ?? producto?.precio,
        stock: selectedVariant.stock ?? producto?.stock,
        imagen: [selectedVariant.imagen],
      }
    : producto;

  return (
    <form action={saveProductoAction} className={`${sectionClassName} grid gap-4`}>
      <input type="hidden" name="id" value={producto?.id ?? ""} />
      <input type="hidden" name="variantCodigo" value={selectedVariant?.codigo ?? ""} />
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          {isEditingVariant
            ? `Editando variante ${selectedVariant?.codigo}`
            : producto
              ? `Editando moto #${producto.id}`
              : "Nueva moto"}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight">
          {displayProducto ? displayProducto.nombre : "Cargar moto"}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Nombre
          <input name="nombre" required defaultValue={displayProducto?.nombre} className={fieldClassName} />
        </label>
        <label className={labelClassName}>
          Codigo
          <input name="codigo" defaultValue={displayProducto?.codigo} className={fieldClassName} />
        </label>
        <label className={labelClassName}>
          Color
          <input
            name="color"
            required
            defaultValue={displayProducto?.color}
            className={fieldClassName}
            placeholder="Rojo"
          />
        </label>
        <label className={labelClassName}>
          Precio
          <input
            name="precio"
            type="number"
            min="0"
            step="1"
            defaultValue={displayProducto?.precio ?? ""}
            className={fieldClassName}
            placeholder="Vacio si es a consultar"
          />
        </label>
        <label className={labelClassName}>
          Stock
          <select name="stock" defaultValue={displayProducto?.stock ?? "virtual"} className={fieldClassName}>
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
          defaultValue={displayProducto?.descripcion}
          className={fieldClassName}
        />
      </label>

      <ImageGalleryField
        galleryImages={galleryImages}
        selectedImages={selectedImages}
        single={isEditingVariant}
      />

      <label className={labelClassName}>
        Subir imagen desde tu dispositivo
        <input
          name="imagenArchivo"
          type="file"
          accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
          multiple={!isEditingVariant}
          className={`${fieldClassName} file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-black file:text-white`}
        />
      </label>

      <label className={labelClassName}>
        Imagenes manuales opcionales
        <textarea
          name="imagen"
          rows={3}
          defaultValue={isEditingVariant ? "" : producto?.imagen.join("\n")}
          className={fieldClassName}
          placeholder="/motos/archivo.webp"
        />
      </label>

      {!isEditingVariant ? (
        <VariantFields variants={childVariants} galleryImages={galleryImages} />
      ) : null}

      <TechnicalSheetFields items={fichaTecnica} />

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
  const galleryImages = await getGalleryImages(productos);
  const selectedProducto = productos.find((producto) => producto.id === Number(params.moto));
  const selectedVariant = selectedProducto?.variantes?.find(
    (variant) => variant.codigo === params.variant,
  );
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
                    {producto.variantes?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {producto.variantes.map((variant) => (
                          <Link
                            key={variant.codigo}
                            href={`${adminPath}?tab=motos&moto=${producto.id}&variant=${encodeURIComponent(variant.codigo)}`}
                            className={`rounded-lg border px-3 py-2 text-xs font-black transition ${
                              params.variant === variant.codigo
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                            }`}
                          >
                            {variant.color}
                          </Link>
                        ))}
                      </div>
                    ) : null}
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
            <ProductForm
              producto={selectedProducto}
              selectedVariant={selectedVariant}
              galleryImages={galleryImages}
            />
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
