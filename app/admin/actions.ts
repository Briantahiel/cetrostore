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
  getFirebaseStorageBucketNames,
  getFirebaseStorageBuckets,
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

const getFilesByName = (formData: FormData, name: string) =>
  formData.getAll(name).filter((value): value is File => value instanceof File);

const parseVariantRows = async (formData: FormData): Promise<ProductoVariante[]> => {
  const codigos = formData.getAll("varianteCodigo");
  const nombres = formData.getAll("varianteNombre");
  const colores = formData.getAll("varianteColor");
  const imagenes = formData.getAll("varianteImagen");
  const imagenesGaleria = formData.getAll("varianteImagenGaleria");
  const archivos = getFilesByName(formData, "varianteImagenArchivo");
  const uploadedByIndex = await Promise.all(
    archivos.map((file) => (file.size > 0 ? uploadImageFiles([file]) : Promise.resolve([]))),
  );

  return codigos
    .map((codigo, index) => {
      const uploadedImage = uploadedByIndex[index]?.[0] ?? "";
      const galleryImage = String(imagenesGaleria[index] ?? "").trim();
      const manualImage = String(imagenes[index] ?? "").trim();

      return {
        codigo: String(codigo ?? "").trim(),
        nombre: String(nombres[index] ?? "").trim(),
        color: String(colores[index] ?? "").trim(),
        imagen: uploadedImage || galleryImage || manualImage,
      };
    })
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
  getFilesByName(formData, "imagenArchivo").filter((value) => value.size > 0);

const extensionByType: Record<string, string> = {
  "image/avif": "avif",
  "image/gif": "gif",
  "image/heic": "heic",
  "image/heif": "heif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const getSafeImageExtension = (file: File) => {
  const fromType = extensionByType[file.type];
  if (fromType) return fromType;

  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["avif", "gif", "heic", "heif", "jpg", "jpeg", "png", "webp"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }

  return null;
};

const uploadImageFiles = async (files: File[]) => {
  const uploadedPaths: string[] = [];

  for (const file of files) {
    const extension = getSafeImageExtension(file);

    if (!extension) {
      throw new Error("Solo se permiten imagenes AVIF, GIF, HEIC, HEIF, JPG, PNG o WEBP.");
    }

    if (file.size > 12 * 1024 * 1024) {
      throw new Error("Cada imagen debe pesar menos de 12 MB.");
    }

    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    if (getFirebaseServiceAccount()) {
      const storagePath = `motos/${fileName}`;
      const token = randomUUID();
      const buckets = getFirebaseStorageBuckets();
      const triedBucketNames: string[] = [];
      let uploadedUrl = "";
      let uploadError: unknown = null;

      for (const bucket of buckets) {
        const bucketFile = bucket.file(storagePath);
        triedBucketNames.push(bucket.name);

        try {
          const [bucketExists] = await bucket.exists();

          if (!bucketExists) {
            uploadError = new Error(`El bucket ${bucket.name} no existe.`);
            continue;
          }

          await bucketFile.save(bytes, {
            contentType: file.type || `image/${extension}`,
            metadata: {
              cacheControl: "public, max-age=31536000, immutable",
              metadata: {
                firebaseStorageDownloadTokens: token,
              },
            },
          });

          uploadedUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storagePath)}?alt=media&token=${token}`;
          break;
        } catch (error) {
          uploadError = error;

          if (process.env.FIREBASE_STORAGE_BUCKET?.trim()) {
            break;
          }
        }
      }

      if (!uploadedUrl) {
        const configuredBucket = process.env.FIREBASE_STORAGE_BUCKET?.trim();
        const guessedBuckets = triedBucketNames.length
          ? triedBucketNames
          : getFirebaseStorageBucketNames().join(", ");
        const bucketHelp = configuredBucket
          ? `Revisa FIREBASE_STORAGE_BUCKET=${configuredBucket} en Vercel.`
          : `Configura FIREBASE_STORAGE_BUCKET en Vercel con el bucket real de Firebase Storage. Se probo: ${guessedBuckets}.`;

        throw uploadError instanceof Error
          ? new Error(`${uploadError.message} ${bucketHelp}`)
          : new Error(`No se pudo subir la imagen a Firebase Storage. ${bucketHelp}`);
      }

      uploadedPaths.push(uploadedUrl);
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
  const fichaTecnica = parseRows(formData, "fichaEtiqueta", "fichaValor") as FichaTecnicaItem[];

  return {
    id,
    codigo: String(formData.get("codigo") ?? "").trim() || undefined,
    nombre: String(formData.get("nombre") ?? "").trim(),
    descripcion: String(formData.get("descripcion") ?? "").trim(),
    precio: parseNumber(formData.get("precio")),
    imagen,
    color: String(formData.get("color") ?? "").trim() || undefined,
    stock: formData.get("stock") === "fisico" ? "fisico" : "virtual",
    fichaTecnica: fichaTecnica.length ? fichaTecnica : undefined,
  };
};

const getActionErrorMessage = (error: unknown) =>
  error instanceof Error && error.message
    ? error.message
    : "No se pudo guardar. Revisa la imagen e intenta de nuevo.";

const redirectToProductoError = (formData: FormData, error: unknown) => {
  const params = new URLSearchParams({
    tab: "motos",
    error: getActionErrorMessage(error),
  });
  const id = String(formData.get("id") ?? "").trim();
  const variantCodigo = String(formData.get("variantCodigo") ?? "").trim();

  if (id) params.set("moto", id);
  if (variantCodigo) params.set("variant", variantCodigo);

  redirect(`${getAdminPath()}?${params.toString()}`);
};

export async function saveProductoAction(formData: FormData) {
  await requireAdminSession();
  try {
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
  const variantes = await parseVariantRows(formData);
  const childVariants = variantes.filter(
    (variante) => !producto.codigo || variante.codigo !== producto.codigo,
  );
  producto.variantes = childVariants.length ? childVariants : undefined;

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
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            fichaTecnica: producto.fichaTecnica,
          };
          const nextVariants = variants.map((variant) =>
            variant.codigo === variantCodigo ? nextVariant : variant,
          );

          return {
            ...item,
            imagen: Array.from(
              new Set([...item.imagen, ...nextVariants.map((variant) => variant.imagen)]),
            ),
            variantes: nextVariants,
          };
        })
      : isEditing
        ? productos.map((item) => (item.id === id ? producto : item))
        : [...productos, producto];

  await saveProductos(nextProductos);
  refreshCatalog();
  } catch (error) {
    redirectToProductoError(formData, error);
  }

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
