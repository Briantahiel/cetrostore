"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getNovedades,
  getProductos,
  saveNovedades,
  saveProductos,
} from "@/data/catalog-store";
import { getAdminPath } from "@/lib/admin-auth";
import { requireAdminSession } from "@/lib/admin-session";
import type { FichaTecnicaItem, Producto, ProductoVariante } from "@/data/productos";

const parseNumber = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  if (!text) return null;

  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
};

const parseJsonArray = <T,>(value: FormDataEntryValue | null, fallback: T[]) => {
  const text = String(value ?? "").trim();
  if (!text) return fallback;

  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed)) {
    throw new Error("El campo JSON debe ser un array.");
  }

  return parsed as T[];
};

const parseLines = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const parseImages = (formData: FormData) => {
  const galleryImages = formData
    .getAll("imagenes")
    .map((value) => String(value).trim())
    .filter(Boolean);
  const manualImages = parseLines(formData.get("imagen"));

  return Array.from(new Set([...galleryImages, ...manualImages]));
};

const refreshCatalog = () => {
  const adminPath = getAdminPath();

  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/catalogo/[id]", "page");
  revalidatePath("/admin");
  revalidatePath(adminPath);
};

const getProductoFromForm = (formData: FormData, id: number): Producto => {
  const imagen = parseImages(formData);
  const variantes = parseJsonArray<ProductoVariante>(
    formData.get("variantes"),
    [],
  );
  const fichaTecnica = parseJsonArray<FichaTecnicaItem>(
    formData.get("fichaTecnica"),
    [],
  );

  return {
    id,
    codigo: String(formData.get("codigo") ?? "").trim() || undefined,
    nombre: String(formData.get("nombre") ?? "").trim(),
    descripcion: String(formData.get("descripcion") ?? "").trim(),
    precio: parseNumber(formData.get("precio")),
    imagen,
    stock: formData.get("stock") === "fisico" ? "fisico" : "virtual",
    variantes: variantes.length ? variantes : undefined,
    fichaTecnica: fichaTecnica.length ? fichaTecnica : undefined,
  };
};

export async function saveProductoAction(formData: FormData) {
  await requireAdminSession();
  const productos = await getProductos();
  const id = Number(formData.get("id"));
  const isEditing = Number.isFinite(id) && id > 0;
  const variantCodigo = String(formData.get("variantCodigo") ?? "").trim();
  const producto = getProductoFromForm(
    formData,
    isEditing ? id : productos.length + 1,
  );

  const selectedVariantImage = String(
    formData.get("imagenSeleccionada") ?? "",
  ).trim();
  const hasImage = producto.imagen.length > 0 || Boolean(selectedVariantImage);

  if (!producto.nombre || !producto.descripcion || !hasImage) {
    throw new Error("Nombre, descripcion e imagen son obligatorios.");
  }

  const currentProduct = productos.find((item) => item.id === id);
  const color = String(formData.get("color") ?? "").trim();

  const nextProductos =
    isEditing && variantCodigo && currentProduct
      ? productos.map((item) => {
          if (item.id !== id) return item;

          const variants = item.variantes ?? [];
          const nextVariant: ProductoVariante = {
            codigo: producto.codigo ?? variantCodigo,
            nombre: producto.nombre,
            imagen: selectedVariantImage || producto.imagen[0],
            color:
              color ||
              variants.find((variant) => variant.codigo === variantCodigo)
                ?.color ||
              producto.nombre,
          };
          const nextVariants = variants.map((variant) =>
            variant.codigo === variantCodigo ? nextVariant : variant,
          );
          const shouldSyncParent =
            item.codigo === variantCodigo ||
            variants[0]?.codigo === variantCodigo;

          return {
            ...item,
            codigo: shouldSyncParent ? nextVariant.codigo : item.codigo,
            nombre: shouldSyncParent ? nextVariant.nombre : item.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            imagen: nextVariants.map((variant) => variant.imagen),
            variantes: nextVariants,
            fichaTecnica: producto.fichaTecnica,
          };
        })
      : isEditing
        ? productos.map((item) => (item.id === id ? producto : item))
        : [...productos, producto];

  await saveProductos(nextProductos);
  refreshCatalog();
  redirect(`${getAdminPath()}?tab=motos`);
}

export async function deleteProductoAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  const productos = await getProductos();

  await saveProductos(productos.filter((producto) => producto.id !== id));
  refreshCatalog();
  redirect(`${getAdminPath()}?tab=motos`);
}

export async function saveNovedadAction(formData: FormData) {
  await requireAdminSession();
  const novedades = await getNovedades();
  const id = Number(formData.get("id"));
  const isEditing = Number.isFinite(id) && id > 0;
  const novedad = {
    id: isEditing ? id : novedades.length + 1,
    etiqueta: String(formData.get("etiqueta") ?? "").trim(),
    titulo: String(formData.get("titulo") ?? "").trim(),
    descripcion: String(formData.get("descripcion") ?? "").trim(),
    detalle: String(formData.get("detalle") ?? "").trim(),
  };

  if (!novedad.etiqueta || !novedad.titulo || !novedad.descripcion) {
    throw new Error("Etiqueta, titulo y descripcion son obligatorios.");
  }

  const nextNovedades = isEditing
    ? novedades.map((item) => (item.id === id ? novedad : item))
    : [...novedades, novedad];

  await saveNovedades(nextNovedades);
  refreshCatalog();
  redirect(`${getAdminPath()}?tab=novedades`);
}

export async function deleteNovedadAction(formData: FormData) {
  await requireAdminSession();
  const id = Number(formData.get("id"));
  const novedades = await getNovedades();

  await saveNovedades(novedades.filter((novedad) => novedad.id !== id));
  refreshCatalog();
  redirect(`${getAdminPath()}?tab=novedades`);
}
