import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/catalogo"
      className="mb-6 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
      style={{ minHeight: "2.75rem" }}
    >
      Volver al catalogo
    </Link>
  );
}
