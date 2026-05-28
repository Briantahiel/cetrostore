import { promises as fs } from "node:fs";
import path from "node:path";
import type { WriteBatch } from "firebase-admin/firestore";
import type { Novedad } from "@/data/novedades";
import type { Producto } from "@/data/productos";
import { getFirebaseDb, hasFirebaseConfig } from "@/lib/firebase-admin";
import productosData from "@/data/productos.json";
import novedadesData from "@/data/novedades.json";

const dataDirectory = path.join(process.cwd(), "data");
const productosPath = path.join(dataDirectory, "productos.json");
const novedadesPath = path.join(dataDirectory, "novedades.json");
const productosCollection = "productos";
const novedadesCollection = "novedades";

const sortById = <T extends { id: number }>(items: T[]) =>
  [...items].sort((a, b) => a.id - b.id);

export const normalizeProductoIds = (productos: Producto[]) =>
  productos.map((producto, index) => ({ ...producto, id: index + 1 }));

export const normalizeNovedadIds = (novedades: Novedad[]) =>
  novedades.map((novedad, index) => ({ ...novedad, id: index + 1 }));

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
      return normalizeProductoIds(sortById(productos));
    }
  }

  const productos = await readJsonFile<Producto[]>(
    productosPath,
    productosData as Producto[],
  );

  return normalizeProductoIds(sortById(productos));
};

export const saveProductos = async (productos: Producto[]) => {
  if (hasFirebaseConfig()) {
    await saveCollectionItems(productosCollection, normalizeProductoIds(productos));
    return;
  }

  await writeJsonFile(productosPath, normalizeProductoIds(productos));
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
