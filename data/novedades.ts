import novedadesData from "./novedades.json";

export type Novedad = {
  id: number;
  etiqueta: string;
  titulo: string;
  descripcion: string;
  detalle: string;
};

export const novedades: Novedad[] = novedadesData as Novedad[];
