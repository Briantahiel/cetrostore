"use client";

/* eslint-disable @next/next/no-img-element */
import { CSSProperties, useCallback, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  onClick?: () => void;
};

export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  imageClassName = "",
  style,
  imageStyle,
  onClick,
}: Props) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isLoading = loadedSrc !== src;
  const markAsLoaded = useCallback(() => setLoadedSrc(src), [src]);
  const handleImageRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete) {
        setLoadedSrc(src);
      }
    },
    [src],
  );

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      )}
      <img
        ref={handleImageRef}
        src={src}
        alt={alt}
        onClick={onClick}
        onLoad={markAsLoaded}
        onError={markAsLoaded}
        className={`${imageClassName} transition-opacity duration-100 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        style={imageStyle}
      />
    </div>
  );
}
