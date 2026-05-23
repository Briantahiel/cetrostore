"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  className?: string;
  label?: string;
};

const defaultClassName =
  "mb-6 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700";

const getSafeCatalogReturnUrl = (value: string | null) => {
  if (!value) return "/catalogo";
  if (value === "/catalogo" || value.startsWith("/catalogo?")) return value;
  return "/catalogo";
};

export default function BackButton({
  className = defaultClassName,
  label = "Volver al catalogo",
}: Props) {
  const searchParams = useSearchParams();
  const returnHref = getSafeCatalogReturnUrl(searchParams.get("from"));

  return (
    <Link
      href={returnHref}
      className={className}
      style={{ minHeight: "2.75rem" }}
    >
      {label}
    </Link>
  );
}
