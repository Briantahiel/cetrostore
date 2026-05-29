"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function WhatsAppLogo() {
  return (
    <Image
      src="/whatsapp.png"
      alt=""
      aria-hidden="true"
      width={32}
      height={32}
      className="block h-8 w-8 object-contain"
    />
  );
}

export default function FloatingActions() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const updateTopButton = () => {
      const distanceToBottom =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight;

      setShowTopButton(window.scrollY > 300 && distanceToBottom < 520);
    };

    updateTopButton();
    window.addEventListener("scroll", updateTopButton, { passive: true });
    window.addEventListener("resize", updateTopButton);

    return () => {
      window.removeEventListener("scroll", updateTopButton);
      window.removeEventListener("resize", updateTopButton);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {showTopButton ? (
        <button
          type="button"
          aria-label="Volver al inicio"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-2xl font-black text-slate-900 shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
        >
          ↑
        </button>
      ) : null}
      <a
        href="https://wa.me/5493489696728"
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl shadow-green-950/25 ring-1 ring-emerald-200 transition hover:-translate-y-0.5 hover:ring-emerald-400"
      >
        <WhatsAppLogo />
      </a>
    </div>
  );
}
