"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "@/components/catalogo/ProductCard";
import { productos } from "@/data/productos";

const SEARCH_HISTORY_KEY = "product-search-history";

const normalizeSearch = (value: string) =>
  value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const productsPerPage = 6;

  const productNames = useMemo(
    () => productos.map((producto) => producto.nombre),
    []
  );

  const normalizedProductNames = useMemo(
    () =>
      new Map(
        productNames.map((nombre) => [normalizeSearch(nombre), nombre] as const)
      ),
    [productNames]
  );

  const normalizedSearch = normalizeSearch(search);

  useEffect(() => {
    const storedHistory = window.localStorage.getItem(SEARCH_HISTORY_KEY);

    if (!storedHistory) return;

    try {
      const parsedHistory = JSON.parse(storedHistory);

      if (Array.isArray(parsedHistory)) {
        const validHistory = parsedHistory.filter(
          (item): item is string =>
            typeof item === "string" &&
            normalizedProductNames.has(normalizeSearch(item))
        );

        const timer = window.setTimeout(() => {
          setSearchHistory(validHistory);
        }, 0);

        return () => window.clearTimeout(timer);
      }
    } catch {
      window.localStorage.removeItem(SEARCH_HISTORY_KEY);
    }
  }, [normalizedProductNames]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  const saveValidSearch = (value: string) => {
    const validProductName = normalizedProductNames.get(normalizeSearch(value));

    if (!validProductName) return;

    setSearchHistory((prevHistory) => {
      const nextHistory = [
        validProductName,
        ...prevHistory.filter(
          (item) => normalizeSearch(item) !== normalizeSearch(validProductName)
        ),
      ].slice(0, 8);

      window.localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(nextHistory)
      );

      return nextHistory;
    });
  };

  const selectSearch = (value: string) => {
    setSearch(value);
    setDebouncedSearch(value);
    setCurrentPage(1);
    saveValidSearch(value);
  };

  const removeHistoryItem = (value: string) => {
    setSearchHistory((prevHistory) => {
      const nextHistory = prevHistory.filter(
        (item) => normalizeSearch(item) !== normalizeSearch(value)
      );

      window.localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(nextHistory)
      );

      return nextHistory;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    window.localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  const productosFiltrados = productos.filter((producto) =>
    normalizeSearch(producto.nombre).includes(normalizeSearch(debouncedSearch))
  );

  const searchSuggestions = useMemo(() => {
    if (!normalizedSearch) return [];

    return productNames
      .filter((nombre) => normalizeSearch(nombre).includes(normalizedSearch))
      .slice(0, 6);
  }, [normalizedSearch, productNames]);

  const visibleHistory = useMemo(() => {
    if (!normalizedSearch) return searchHistory;

    return searchHistory.filter((item) =>
      normalizeSearch(item).includes(normalizedSearch)
    );
  }, [normalizedSearch, searchHistory]);

  const dropdownIsVisible =
    isSearchFocused &&
    (searchSuggestions.length > 0 || visibleHistory.length > 0);

  const productosOrdenados = useMemo(() => {
    const arr = [...productosFiltrados];

    if (sortOrder === "price-asc") {
      arr.sort((a, b) => a.precio - b.precio);
    }

    if (sortOrder === "price-desc") {
      arr.sort((a, b) => b.precio - a.precio);
    }

    if (sortOrder === "name-asc") {
      arr.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    return arr;
  }, [productosFiltrados, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(productosOrdenados.length / productsPerPage)
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = productosOrdenados.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <section className="px-4 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-900">
              Catálogo
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Elegí tu moto
            </h2>
            {/* <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              {productosOrdenados.length} modelos disponibles. Ordena, compara
              y consulta por el que te guste.
            </p> */}
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">Consultá disponibilidad, financiación y medios de pago.</p>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Sin ordenar</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="name-asc">A-Z</option>
          </select>
        </div>

        <div ref={searchWrapperRef} className="relative mb-8 w-full">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={(e) => {
              if (!searchWrapperRef.current?.contains(e.relatedTarget)) {
                setIsSearchFocused(false);
              }
            }}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveValidSearch(search);
              }

              if (e.key === "Escape") {
                setSearch("");
                setDebouncedSearch("");
                setCurrentPage(1);
                setIsSearchFocused(false);
              }
            }}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 pr-12 text-sm font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />

          {search && (
            <button
              type="button"
              aria-label="Limpiar busqueda"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setSearch("");
                setDebouncedSearch("");
              }}
              className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              x
            </button>
          )}

          {dropdownIsVisible && (
            <div
              tabIndex={-1}
              className="absolute left-0 right-0 top-16 z-30 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
            >
              {searchSuggestions.length > 0 && (
                <div className="border-b border-slate-100 py-2">
                  <p className="px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-400">
                    Sugerencias
                  </p>
                  {searchSuggestions.map((nombre) => (
                    <button
                      key={nombre}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectSearch(nombre)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span>{nombre}</span>
                    </button>
                  ))}
                </div>
              )}

              {visibleHistory.length > 0 && (
                <div className="py-2">
                  <div className="flex items-center justify-between px-4 py-2">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                      Historial
                    </p>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={clearSearchHistory}
                      className="text-xs font-bold text-red-500 transition hover:text-red-600"
                    >
                      Borrar todo
                    </button>
                  </div>

                  {visibleHistory.map((item) => (
                    <div
                      key={item}
                      className="group flex items-center justify-between gap-3 px-4 py-3 transition hover:bg-slate-50"
                    >
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectSearch(item)}
                        className="min-w-0 flex-1 truncate text-left text-sm font-bold text-slate-700"
                      >
                        {item}
                      </button>

                      <button
                        type="button"
                        aria-label={`Eliminar ${item} del historial`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => removeHistoryItem(item)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagen={producto.imagen}
            />
          ))}
        </div>

        {paginatedProducts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-bold text-slate-500">
            No se encontraron productos
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="text-sm font-bold text-slate-500">
            Pagina {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-600">
  ¿No encontrás el modelo que buscás? Consultanos por ingreso de nuevas unidades y financiación disponible.
</div>
      </div>
    </section>
  );
}
