"use client";

/* eslint-disable @next/next/no-img-element */
import { CSSProperties, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      )}
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        className={`${imageClassName} transition-opacity duration-100 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        style={imageStyle}
      />
    </div>
  );
}
