"use client";

import { useEffect, useState } from "react";

export function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="block h-7 w-7 fill-current">
      <path d="M16.02 3.2A12.74 12.74 0 0 0 5.1 22.5L3.5 28.8l6.46-1.53A12.76 12.76 0 1 0 16.02 3.2Zm0 2.35a10.41 10.41 0 0 1 8.76 16.04 10.4 10.4 0 0 1-13.98 3.4l-.45-.27-3.37.8.83-3.27-.3-.47a10.4 10.4 0 0 1 8.51-16.23Zm-4.3 4.98c-.25 0-.65.09-.99.45-.34.37-1.3 1.27-1.3 3.1 0 1.82 1.33 3.58 1.51 3.83.19.24 2.57 4.12 6.34 5.6 3.14 1.24 3.78.99 4.46.93.69-.06 2.21-.9 2.53-1.77.31-.87.31-1.62.22-1.77-.09-.16-.34-.25-.71-.44-.37-.18-2.2-1.08-2.54-1.2-.34-.13-.59-.19-.84.18-.25.38-.96 1.2-1.18 1.46-.22.25-.43.28-.8.1-.37-.19-1.56-.58-2.98-1.84-1.1-.98-1.84-2.2-2.06-2.57-.22-.38-.02-.58.16-.76.17-.17.37-.44.56-.65.18-.22.25-.37.37-.62.13-.25.07-.47-.03-.66-.09-.18-.84-2.02-1.15-2.77-.3-.72-.61-.62-.84-.63h-.75Z" />
    </svg>
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
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-950/25 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
      >
        <WhatsAppLogo />
      </a>
    </div>
  );
}
