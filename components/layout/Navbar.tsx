import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 overflow-hidden border-b border-blue-500/20 bg-white/90 text-slate-950 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">
      <div className="relative bg-slate-950 px-4 py-2 text-center text-xs font-black uppercase tracking-[0.18em] text-white sm:px-8">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-blue-500/50 to-transparent" />
        <span className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-orange-500/90 via-red-600/30 to-transparent" />
      </div>

      <nav className="relative mx-auto flex h-24 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <Link
          href="/"
          className="group flex flex-1 items-center gap-3"
          aria-label="Cetromotos inicio"
        >
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-[#020617] via-[#12306B] via-30% to-[#FF7A00] p-0.5 shadow-2xl shadow-blue-600/30 transition duration-300 group-hover:scale-105 group-hover:shadow-orange-400/30">
            <span className="flex h-full w-full items-center justify-center rounded-[0.9rem] bg-slate-950 text-lg font-black text-white">
              CM
            </span>
          </span>

          <span className="flex min-w-0 flex-col leading-none">
       <span className="truncate bg-gradient-to-r from-[#020617] via-[#12306B] via-30% to-[#FF7A00] bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl">
  cetromotos
</span>

            <span className="mt-1 text-[0.68rem] font-black uppercase tracking-[0.24em] text-slate-700">
              motos & showroom
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/catalogo"
            className="hidden rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-black uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 md:inline-flex"
          >
            Catálogo
          </Link>
          <a
            href="https://wa.me/5493489696728"
            target="_blank"
            rel="noreferrer"
            className="group relative border-green-700 border-2 inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-xl shadow-gray-600/20 transition hover:-translate-y-0.5 sm:px-6"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-700 opacity-90 " />
            <span className="relative whitespace-nowrap">WhatsApp</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
