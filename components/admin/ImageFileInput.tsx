"use client";

import { useState } from "react";

type Props = {
  name: string;
  multiple?: boolean;
  className?: string;
};

const maxImageSide = 1600;
const jpegQuality = 0.78;

const readImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No se pudo leer la imagen."));
    };
    image.src = objectUrl;
  });

const canvasToBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("No se pudo preparar la imagen."));
        }
      },
      "image/jpeg",
      jpegQuality,
    );
  });

const resizeImageFile = async (file: File) => {
  if (!file.type.startsWith("image/")) return file;

  const image = await readImage(file);
  const scale = Math.min(1, maxImageSide / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return file;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToBlob(canvas);
  const baseName = file.name.replace(/\.[^.]+$/, "") || "imagen";

  return new File([blob], `${baseName}.jpg`, {
    lastModified: Date.now(),
    type: "image/jpeg",
  });
};

const getTotalSizeMb = (files: File[]) =>
  files.reduce((total, file) => total + file.size, 0) / (1024 * 1024);

export default function ImageFileInput({ name, multiple = false, className = "" }: Props) {
  const [status, setStatus] = useState("");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const selectedFiles = Array.from(input.files ?? []);

    if (!selectedFiles.length) {
      setStatus("");
      return;
    }

    setStatus("Preparando imagen...");

    try {
      const resizedFiles = await Promise.all(selectedFiles.map(resizeImageFile));
      const transfer = new DataTransfer();

      resizedFiles.forEach((file) => transfer.items.add(file));
      input.files = transfer.files;
      setStatus(
        `${resizedFiles.length === 1 ? "Imagen lista" : "Imagenes listas"} (${getTotalSizeMb(resizedFiles).toFixed(1)} MB)`,
      );
    } catch {
      setStatus("No se pudo optimizar; se enviara el archivo original.");
    }
  };

  return (
    <div className="grid gap-2">
      <input
        name={name}
        type="file"
        accept="image/*,.avif,.gif,.heic,.heif,.jpg,.jpeg,.png,.webp"
        multiple={multiple}
        onChange={handleChange}
        className={className}
      />
      {status ? <p className="text-xs font-bold text-slate-500">{status}</p> : null}
    </div>
  );
}
