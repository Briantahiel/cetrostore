import { promises as fs } from "node:fs";
import path from "node:path";
import type { Novedad } from "@/data/novedades";
import type { Producto } from "@/data/productos";
import productosData from "@/data/productos.json";
import novedadesData from "@/data/novedades.json";

const dataDirectory = path.join(process.cwd(), "data");
const productosPath = path.join(dataDirectory, "productos.json");
const novedadesPath = path.join(dataDirectory, "novedades.json");

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
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
};

export const getProductos = async () => {
  const productos = await readJsonFile<Producto[]>(
    productosPath,
    productosData as Producto[],
  );

  return normalizeProductoIds(sortById(productos));
};

export const saveProductos = async (productos: Producto[]) => {
  await writeJsonFile(productosPath, normalizeProductoIds(productos));
};

export const getNovedades = async () => {
  const novedades = await readJsonFile<Novedad[]>(
    novedadesPath,
    novedadesData as Novedad[],
  );

  return normalizeNovedadIds(sortById(novedades));
};

export const saveNovedades = async (novedades: Novedad[]) => {
  await writeJsonFile(novedadesPath, normalizeNovedadIds(novedades));
};
