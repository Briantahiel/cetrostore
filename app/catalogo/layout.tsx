import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalogo de motos",
  description:
    "Explora el catalogo de motos disponibles en Cetromotos con fichas, imagenes y detalles de cada modelo.",
};

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
