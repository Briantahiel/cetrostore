"use client";

import { useState } from "react";
import { getProductoImagenPrincipal } from "@/data/productos";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

type Props = {
  nombre: string;
  imagen: string[];
  selectedImage?: string;
  onSelectImage?: (image: string) => void;
  imageLabels?: Record<string, string>;
};

export default function ProductGallery({
  nombre,
  imagen,
  selectedImage,
  onSelectImage,
  imageLabels = {},
}: Props) {
  const [internalSelectedImage, setInternalSelectedImage] = useState(() =>
    getProductoImagenPrincipal(imagen),
  );
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const mainImage =
    selectedImage || internalSelectedImage || getProductoImagenPrincipal(imagen);

  const handleSelectImage = (image: string) => {
    setInternalSelectedImage(image);
    onSelectImage?.(image);
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="block w-full max-w-xl cursor-zoom-in rounded-lg text-left"
        onClick={() => setExpandedImage(mainImage)}
        aria-label={`Ampliar imagen de ${nombre}`}
      >
        <ImageWithSkeleton
          src={mainImage}
          alt={nombre}
          className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-slate-100 p-4 sm:p-5"
          imageClassName="block"
          imageStyle={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            width: "100%",
          }}
        />
      </button>

      <div className="grid w-full max-w-xl grid-cols-3 gap-3">
        {imagen.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => handleSelectImage(item)}
            className={`flex aspect-square min-h-16 items-center justify-center rounded-lg border bg-white p-2 transition hover:border-blue-300 ${
              mainImage === item ? "border-blue-500" : "border-slate-200"
            }`}
            aria-label={`Ver ${imageLabels[item] ?? `foto ${index + 1}`} de ${nombre}`}
          >
            <ImageWithSkeleton
              src={item}
              alt={`${nombre} foto ${index + 1}`}
              className="flex h-full w-full items-center justify-center"
              imageClassName="block max-h-full max-w-full object-contain"
            />
          </button>
        ))}
      </div>

      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${nombre}`}
          onClick={() => setExpandedImage(null)}
        >
          <button
            type="button"
          className="absolute right-4 top-4 rounded-lg bg-white px-4 py-2 text-sm font-black text-slate-900 transition hover:bg-slate-200"
            onClick={() => setExpandedImage(null)}
          >
            Cerrar
          </button>
          <ImageWithSkeleton
            src={expandedImage}
            alt={nombre}
            className="flex max-h-[86vh] max-w-[92vw] items-center justify-center rounded-lg bg-white p-4"
            imageClassName="block"
            imageStyle={{
              maxHeight: "82vh",
              maxWidth: "88vw",
              objectFit: "contain",
              width: "100%",
            }}
            onClick={() => setExpandedImage(null)}
          />
        </div>
      )}
    </div>
  );
}
