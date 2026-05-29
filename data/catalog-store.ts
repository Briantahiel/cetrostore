import { promises as fs } from "node:fs";
import path from "node:path";
import type { WriteBatch } from "firebase-admin/firestore";
import type { Novedad } from "@/data/novedades";
import type { Producto, ProductoVariante } from "@/data/productos";
import { getFirebaseDb, hasFirebaseConfig } from "@/lib/firebase-admin";
import productosData from "@/data/productos.json";
import novedadesData from "@/data/novedades.json";

const dataDirectory = path.join(process.cwd(), "data");
const productosPath = path.join(dataDirectory, "productos.json");
const novedadesPath = path.join(dataDirectory, "novedades.json");
const productosCollection = "productos";
const novedadesCollection = "novedades";
const colorSuffixes = [
  { label: "Rojo", words: ["rojo", "roja"] },
  { label: "Blanco", words: ["blanco", "blanca"] },
  { label: "Negro", words: ["negro", "negra"] },
  { label: "Gris", words: ["gris"] },
  { label: "Azul", words: ["azul"] },
  { label: "Verde", words: ["verde"] },
  { label: "Beige", words: ["beige"] },
  { label: "Marron", words: ["marron", "marrón"] },
  { label: "Amarillo", words: ["amarillo", "amarilla"] },
  { label: "Naranja", words: ["naranja"] },
];

const sortById = <T extends { id: number }>(items: T[]) =>
  [...items].sort((a, b) => a.id - b.id);

export const normalizeProductoIds = (productos: Producto[]) =>
  productos.map((producto, index) => ({ ...producto, id: index + 1 }));

export const normalizeNovedadIds = (novedades: Novedad[]) =>
  novedades.map((novedad, index) => ({ ...novedad, id: index + 1 }));

const getColorVariantFromName = (name: string) => {
  const normalizedName = name.trim().toLowerCase();
  const match = colorSuffixes
    .flatMap((color) => color.words.map((word) => ({ ...color, word })))
    .find((color) => normalizedName.endsWith(` ${color.word}`));

  if (!match) return null;

  return {
    baseName: name.slice(0, -match.word.length).trim(),
    color: match.label,
  };
};

const getVariantKey = (variant: ProductoVariante) =>
  variant.codigo || `${variant.nombre}-${variant.imagen}`;

export const groupProductoVariants = (productos: Producto[]) => {
  const buckets = new Map<string, Producto[]>();

  for (const producto of sortById(productos)) {
    const parsedColor = getColorVariantFromName(producto.nombre);
    const key = parsedColor?.baseName ?? `__single_${producto.id}`;
    buckets.set(key, [...(buckets.get(key) ?? []), producto]);
  }

  return Array.from(buckets.values()).map((bucket) => {
    if (bucket.length === 1) return bucket[0];

    const parent = bucket[0];
    const variants = new Map<string, ProductoVariante>();

    for (const item of bucket) {
      const parsedColor = getColorVariantFromName(item.nombre);

      for (const variant of item.variantes ?? []) {
        variants.set(getVariantKey(variant), variant);
      }

      if (!item.variantes?.length && item.imagen[0]) {
        const variant: ProductoVariante = {
          codigo: item.codigo ?? `producto-${item.id}`,
          nombre: item.nombre,
          imagen: item.imagen[0],
          color: parsedColor?.color ?? item.nombre,
          descripcion: item.descripcion,
          precio: item.precio,
          stock: item.stock,
          fichaTecnica: item.fichaTecnica,
        };
        variants.set(getVariantKey(variant), variant);
      }
    }

    const nextVariants = Array.from(variants.values());

    return {
      ...parent,
      imagen: nextVariants.map((variant) => variant.imagen),
      variantes: nextVariants.length > 1 ? nextVariants : parent.variantes,
    };
  });
};

const readJsonFile = async <T,>(filePath: string, fallback: T): Promise<T> => {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
};

const writeJsonFile = async <T,>(filePath: string, data: T) => {
  if (process.env.VERCEL) {
    throw new Error(
      "Firebase no esta configurado en Vercel. Revisa FIREBASE_SERVICE_ACCOUNT_BASE64 o las variables FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY.",
    );
  }

  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
};

const sanitizeForFirestore = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const getCollectionItems = async <T extends { id: number }>(collectionName: string) => {
  const snapshot = await getFirebaseDb().collection(collectionName).orderBy("id", "asc").get();

  return snapshot.docs.map((doc) => doc.data() as T);
};

const saveCollectionItems = async <T extends { id: number }>(
  collectionName: string,
  items: T[],
) => {
  const db = getFirebaseDb();
  const collection = db.collection(collectionName);
  const snapshot = await collection.get();
  const nextIds = new Set(items.map((item) => String(item.id)));
  let batch: WriteBatch = db.batch();
  let operationCount = 0;

  const commitIfNeeded = async () => {
    if (operationCount === 0) return;

    await batch.commit();
    batch = db.batch();
    operationCount = 0;
  };

  for (const doc of snapshot.docs) {
    if (!nextIds.has(doc.id)) {
      batch.delete(doc.ref);
      operationCount += 1;
    }
  }

  for (const item of items) {
    batch.set(collection.doc(String(item.id)), sanitizeForFirestore(item));
    operationCount += 1;

    if (operationCount >= 450) {
      await commitIfNeeded();
    }
  }

  await commitIfNeeded();
};

export const getProductos = async () => {
  if (hasFirebaseConfig()) {
    const productos = await getCollectionItems<Producto>(productosCollection);

    if (productos.length) {
      return normalizeProductoIds(groupProductoVariants(sortById(productos)));
    }
  }

  const productos = await readJsonFile<Producto[]>(
    productosPath,
    productosData as Producto[],
  );

  return normalizeProductoIds(groupProductoVariants(sortById(productos)));
};

export const saveProductos = async (productos: Producto[]) => {
  const normalizedProductos = normalizeProductoIds(groupProductoVariants(productos));

  if (hasFirebaseConfig()) {
    await saveCollectionItems(productosCollection, normalizedProductos);
    return;
  }

  await writeJsonFile(productosPath, normalizedProductos);
};

export const getNovedades = async () => {
  if (hasFirebaseConfig()) {
    const novedades = await getCollectionItems<Novedad>(novedadesCollection);

    if (novedades.length) {
      return normalizeNovedadIds(sortById(novedades));
    }
  }

  const novedades = await readJsonFile<Novedad[]>(
    novedadesPath,
    novedadesData as Novedad[],
  );

  return normalizeNovedadIds(sortById(novedades));
};

export const saveNovedades = async (novedades: Novedad[]) => {
  if (hasFirebaseConfig()) {
    await saveCollectionItems(novedadesCollection, normalizeNovedadIds(novedades));
    return;
  }

  await writeJsonFile(novedadesPath, normalizeNovedadIds(novedades));
};
