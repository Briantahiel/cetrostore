import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catalogo" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-sm">
          <p className="text-2xl font-black tracking-tight">cetromotos</p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Venta de motos con financiación, atención personalizada y entrega
            coordinada.
          </p>
        </div>

        <div className="flex w-20 gap-8 items-center justify-between">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-slate-300 transition hover:text-cyan-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href="https://wa.me/5493489696728"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-cyan-300 px-5 text-sm font-black text-slate-950 transition hover:bg-white"
        >
          WhatsApp
        </a>
      </div>

      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs font-medium text-slate-500 sm:px-8 lg:px-10">
        © 2026 cetromotos. Todos los derechos reservados. Created by Brian 
      </div>
    </footer>
  );
}
