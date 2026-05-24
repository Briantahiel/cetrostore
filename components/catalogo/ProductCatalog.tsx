"use client";

import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import ProductCard from "@/components/catalogo/ProductCard";
import { productos } from "@/data/productos";

const normalizeSearch = (value: string) =>
  value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const cilindradaRanges = [
  { label: "Hasta 110cc", value: "0-110", min: 0, max: 110 },
  { label: "111cc a 150cc", value: "111-150", min: 111, max: 150 },
  { label: "151cc a 250cc", value: "151-250", min: 151, max: 250 },
  { label: "Mas de 250cc", value: "251-up", min: 251, max: Infinity },
];

const getBrand = (name: string) => name.split(" ")[0];

const getDisplacement = (name: string) => {
  const match = name.match(/\b(\d{3})\b/);
  return match ? Number(match[1]) : null;
};

const catalogReturnKey = "catalog-return-position";
const catalogUrlChangeEvent = "catalog-url-change";

const getCatalogSnapshot = () => {
  if (typeof window === "undefined") return "";
  return window.location.search;
};

const getServerCatalogSnapshot = () => "";

const subscribeToCatalogUrl = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(catalogUrlChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(catalogUrlChangeEvent, onStoreChange);
  };
};

const getCatalogStateFromSearch = (searchParams: string) => {
  const params = new URLSearchParams(searchParams);
  const pageFromUrl = Number(params.get("page"));

  return {
    currentPage: Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1,
    search: params.get("q") ?? "",
    selectedBrand: params.get("brand") ?? "",
    selectedDisplacementRange: params.get("cc") ?? "",
    sortOrder: params.get("sort") ?? "",
  };
};

export default function ProductCatalog() {
  const catalogSearchParams = useSyncExternalStore(
    subscribeToCatalogUrl,
    getCatalogSnapshot,
    getServerCatalogSnapshot,
  );
  const {
    currentPage,
    search,
    selectedBrand,
    selectedDisplacementRange,
    sortOrder,
  } = useMemo(
    () => getCatalogStateFromSearch(catalogSearchParams),
    [catalogSearchParams],
  );
  const restoredScrollRef = useRef(false);

  const productsPerPage = 6;

  const brands = useMemo(
    () =>
      Array.from(new Set(productos.map((producto) => getBrand(producto.nombre))))
        .sort((a, b) => a.localeCompare(b)),
    [],
  );

  const selectedDisplacement = cilindradaRanges.find(
    (range) => range.value === selectedDisplacementRange,
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeSearch(search);

    return productos.filter((producto) => {
      const brandMatches =
        !selectedBrand || getBrand(producto.nombre) === selectedBrand;

      const searchMatches =
        !normalizedSearch ||
        normalizeSearch(producto.nombre).includes(normalizedSearch) ||
        normalizeSearch(producto.codigo ?? "").includes(normalizedSearch) ||
        producto.variantes?.some(
          (variante) =>
            normalizeSearch(variante.nombre).includes(normalizedSearch) ||
            normalizeSearch(variante.codigo).includes(normalizedSearch),
        );

      const displacement = getDisplacement(producto.nombre);
      const displacementMatches =
        !selectedDisplacement ||
        (displacement !== null &&
          displacement >= selectedDisplacement.min &&
          displacement <= selectedDisplacement.max);

      return brandMatches && searchMatches && displacementMatches;
    });
  }, [search, selectedBrand, selectedDisplacement]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    if (sortOrder === "name-asc") {
      products.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    return products;
  }, [filteredProducts, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / productsPerPage));
  const activePage = Math.min(currentPage, totalPages);

  const updateCatalogUrl = useCallback(
    (updates: Partial<ReturnType<typeof getCatalogStateFromSearch>>) => {
      const nextState = {
        currentPage,
        search,
        selectedBrand,
        selectedDisplacementRange,
        sortOrder,
        ...updates,
      };
      const params = new URLSearchParams();

      if (nextState.search) params.set("q", nextState.search);
      if (nextState.selectedBrand) params.set("brand", nextState.selectedBrand);
      if (nextState.selectedDisplacementRange) {
        params.set("cc", nextState.selectedDisplacementRange);
      }
      if (nextState.sortOrder) params.set("sort", nextState.sortOrder);
      if (nextState.currentPage > 1) {
        params.set("page", String(nextState.currentPage));
      }

      const query = params.toString();
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;

      window.history.replaceState(null, "", nextUrl);
      window.dispatchEvent(new Event(catalogUrlChangeEvent));
    },
    [
      currentPage,
      search,
      selectedBrand,
      selectedDisplacementRange,
      sortOrder,
    ],
  );

  const startIndex = (activePage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  useEffect(() => {
    if (currentPage !== activePage) {
      updateCatalogUrl({ currentPage: activePage });
    }
  }, [activePage, currentPage, updateCatalogUrl]);

  const saveCatalogPosition = useCallback(() => {
    sessionStorage.setItem(
      catalogReturnKey,
      JSON.stringify({
        scrollY: window.scrollY,
        url: `${window.location.pathname}${window.location.search}`,
      }),
    );
  }, []);

  const getProductDetailHref = useCallback(
    (productId: number) => {
      const returnUrl = `/catalogo${catalogSearchParams}`;
      return `/catalogo/${productId}?from=${encodeURIComponent(returnUrl)}`;
    },
    [catalogSearchParams],
  );

  useEffect(() => {
    if (restoredScrollRef.current) return;

    const savedValue = sessionStorage.getItem(catalogReturnKey);
    if (!savedValue) return;

    try {
      const saved = JSON.parse(savedValue) as { scrollY?: number; url?: string };
      const currentUrl = `${window.location.pathname}${window.location.search}`;

      if (saved.url === currentUrl && typeof saved.scrollY === "number") {
        restoredScrollRef.current = true;
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: saved.scrollY });
          sessionStorage.removeItem(catalogReturnKey);
        });
      }
    } catch {
      sessionStorage.removeItem(catalogReturnKey);
    }
  }, [paginatedProducts.length]);

  const clearFilters = () => {
    updateCatalogUrl({
      currentPage: 1,
      search: "",
      selectedBrand: "",
      selectedDisplacementRange: "",
      sortOrder: "",
    });
  };

  return (
    <section className="px-4 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-900">
              Catalogo
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Elegi tu moto
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Filtra por marca y cilindrada. Consulta disponibilidad,
              financiacion y medios de pago.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">
            {sortedProducts.length} unidades
          </div>
        </div>

        <div className="mb-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h3 className="text-lg font-black tracking-tight">
              Filtros de busqueda
            </h3>
            <button
              type="button"
              onClick={clearFilters}
              className="w-fit rounded-lg border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              Limpiar filtros
            </button>
          </div>

          <div className="mb-5">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Marca
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  updateCatalogUrl({ currentPage: 1, selectedBrand: "" });
                }}
                className={`rounded-lg border px-4 py-2 text-sm font-black transition ${
                  selectedBrand === ""
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                Todas
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => {
                    updateCatalogUrl({ currentPage: 1, selectedBrand: brand });
                  }}
                  className={`rounded-lg border px-4 py-2 text-sm font-black transition ${
                    selectedBrand === brand
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-2 text-sm font-black">
              Modelo
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  updateCatalogUrl({ currentPage: 1, search: event.target.value });
                }}
                placeholder="Buscar por nombre o codigo"
                className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-black">
              Cilindrada
              <select
                value={selectedDisplacementRange}
                onChange={(event) => {
                  updateCatalogUrl({
                    currentPage: 1,
                    selectedDisplacementRange: event.target.value,
                  });
                }}
                className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Todas</option>
                {cilindradaRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-black">
              Orden
              <select
                value={sortOrder}
                onChange={(event) => {
                  updateCatalogUrl({ currentPage: 1, sortOrder: event.target.value });
                }}
                className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Sin ordenar</option>
                <option value="name-asc">A-Z</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
            {selectedBrand && <span>Marca: {selectedBrand}</span>}
            {selectedDisplacement && (
              <span>Cilindrada: {selectedDisplacement.label}</span>
            )}
            {search && <span>Modelo: {search}</span>}
          </div>
        </div>

        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {paginatedProducts.map((producto) => (
            <ProductCard
              key={producto.id}
              id={producto.id}
              codigo={producto.codigo}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              imagen={producto.imagen}
              stock={producto.stock}
              detailHref={getProductDetailHref(producto.id)}
              onOpen={saveCatalogPosition}
            />
          ))}
        </div>

        {paginatedProducts.length === 0 && (
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-bold text-slate-500">
            No se encontraron productos con esos filtros
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() =>
              updateCatalogUrl({ currentPage: Math.max(1, activePage - 1) })
            }
            disabled={activePage === 1}
            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="text-sm font-bold text-slate-500">
            Pagina {activePage} de {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              updateCatalogUrl({
                currentPage: Math.min(totalPages, activePage + 1),
              })
            }
            disabled={activePage === totalPages}
            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 text-center text-sm font-medium text-slate-600">
          No encontras el modelo que buscas? Consultanos por el ingreso de
          nuevas unidades y financiacion disponible.
        </div>
      </div>
    </section>
  );
}
