"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
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
import {
  getFirebaseStorageBucket,
  getFirebaseServiceAccount,
} from "@/lib/firebase-admin";
import type { FichaTecnicaItem, Producto, ProductoVariante } from "@/data/productos";

const parseNumber = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  if (!text) return null;

  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
};

const parseRows = (formData: FormData, labelName: string, valueName: string) => {
  const labels = formData.getAll(labelName);
  const values = formData.getAll(valueName);

  return labels
    .map((label, index) => ({
      etiqueta: String(label ?? "").trim(),
      valor: String(values[index] ?? "").trim(),
    }))
    .filter((item) => item.etiqueta && item.valor);
};

const parseVariantRows = (formData: FormData): ProductoVariante[] => {
  const codigos = formData.getAll("varianteCodigo");
  const nombres = formData.getAll("varianteNombre");
  const colores = formData.getAll("varianteColor");
  const imagenes = formData.getAll("varianteImagen");

  return codigos
    .map((codigo, index) => ({
      codigo: String(codigo ?? "").trim(),
      nombre: String(nombres[index] ?? "").trim(),
      color: String(colores[index] ?? "").trim(),
      imagen: String(imagenes[index] ?? "").trim(),
    }))
    .filter((variante) => variante.codigo && variante.nombre && variante.color && variante.imagen);
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

const getUploadedFiles = (formData: FormData) =>
  formData
    .getAll("imagenArchivo")
    .filter((value): value is File => value instanceof File && value.size > 0);

const extensionByType: Record<string, string> = {
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const getSafeImageExtension = (file: File) => {
  const fromType = extensionByType[file.type];
  if (fromType) return fromType;

  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["avif", "gif", "jpg", "jpeg", "png", "webp"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }

  return null;
};

const uploadImageFiles = async (files: File[]) => {
  const uploadedPaths: string[] = [];

  for (const file of files) {
    const extension = getSafeImageExtension(file);

    if (!extension) {
      throw new Error("Solo se permiten imagenes AVIF, GIF, JPG, PNG o WEBP.");
    }

    if (file.size > 4 * 1024 * 1024) {
      throw new Error("Cada imagen debe pesar menos de 4 MB.");
    }

    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    if (process.env.FIREBASE_STORAGE_BUCKET?.trim()) {
      const bucket = getFirebaseStorageBucket();
      const storagePath = `motos/${fileName}`;
      const token = randomUUID();
      const bucketFile = bucket.file(storagePath);

      await bucketFile.save(bytes, {
        contentType: file.type || `image/${extension}`,
        metadata: {
          cacheControl: "public, max-age=31536000, immutable",
          metadata: {
            firebaseStorageDownloadTokens: token,
          },
        },
      });

      uploadedPaths.push(
        `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storagePath)}?alt=media&token=${token}`,
      );
      continue;
    }

    if (process.env.VERCEL) {
      throw new Error(
        "Para subir imagenes en Vercel configura FIREBASE_STORAGE_BUCKET con el bucket de Firebase Storage.",
      );
    }

    if (getFirebaseServiceAccount() && process.env.NODE_ENV !== "development") {
      throw new Error("Falta configurar FIREBASE_STORAGE_BUCKET.");
    }

    const localDirectory = path.join(process.cwd(), "public", "motos");
    await fs.mkdir(localDirectory, { recursive: true });
    await fs.writeFile(path.join(localDirectory, fileName), bytes);
    uploadedPaths.push(`/motos/${fileName}`);
  }

  return uploadedPaths;
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
  const variantes = parseVariantRows(formData);
  const fichaTecnica = parseRows(formData, "fichaEtiqueta", "fichaValor") as FichaTecnicaItem[];

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
  const uploadedImages = await uploadImageFiles(getUploadedFiles(formData));
  const productos = await getProductos();
  const id = Number(formData.get("id"));
  const isEditing = Number.isFinite(id) && id > 0;
  const variantCodigo = String(formData.get("variantCodigo") ?? "").trim();
  const producto = getProductoFromForm(
    formData,
    isEditing ? id : productos.length + 1,
  );
  producto.imagen = Array.from(new Set([...uploadedImages, ...producto.imagen]));

  const selectedVariantImage = String(
    formData.get("imagenSeleccionada") ?? "",
  ).trim();
  const uploadedVariantImage = uploadedImages[0] ?? "";
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
            imagen: uploadedVariantImage || selectedVariantImage || producto.imagen[0],
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
