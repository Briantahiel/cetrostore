"use client";

import { useState } from "react";

type Props = {
  title: string;
  text: string;
  url: string;
  className?: string;
  idleLabel?: string;
  copiedLabel?: string;
  onClick?: () => void;
};

export default function ShareButton({
  title,
  text,
  url,
  className,
  idleLabel = "Compartir",
  copiedLabel = "Enlace copiado",
  onClick,
}: Props) {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  const handleShare = async () => {
    onClick?.();

    const shareUrl = new URL(url, window.location.origin).toString();
    const shareData = {
      title,
      text,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 2200);
    } catch {
      setShareStatus("idle");
    }
  };

  return (
    <button type="button" onClick={handleShare} className={className}>
      {shareStatus === "copied" ? copiedLabel : idleLabel}
    </button>
  );
}
