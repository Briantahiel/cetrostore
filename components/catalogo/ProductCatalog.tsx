"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/catalogo/ProductCard";
import { productos } from "@/data/productos";

const normalizeSearch = (value: string) =>
  value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const priceRanges = [
  { label: "Hasta $2M", value: "0-2000000", min: 0, max: 2000000 },
  { label: "$2M a $4M", value: "2000000-4000000", min: 2000000, max: 4000000 },
  { label: "$4M a $7M", value: "4000000-7000000", min: 4000000, max: 7000000 },
  { label: "Mas de $7M", value: "7000000-up", min: 7000000, max: Infinity },
];

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

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedDisplacementRange, setSelectedDisplacementRange] =
    useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const brands = useMemo(
    () =>
      Array.from(new Set(productos.map((producto) => getBrand(producto.nombre))))
        .sort((a, b) => a.localeCompare(b)),
    [],
  );

  const selectedPrice = priceRanges.find(
    (range) => range.value === selectedPriceRange,
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
        normalizeSearch(producto.nombre).includes(normalizedSearch);

      const priceMatches =
        !selectedPrice ||
        (producto.precio >= selectedPrice.min &&
          producto.precio <= selectedPrice.max);

      const displacement = getDisplacement(producto.nombre);
      const displacementMatches =
        !selectedDisplacement ||
        (displacement !== null &&
          displacement >= selectedDisplacement.min &&
          displacement <= selectedDisplacement.max);

      return (
        brandMatches && searchMatches && priceMatches && displacementMatches
      );
    });
  }, [search, selectedBrand, selectedDisplacement, selectedPrice]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    if (sortOrder === "price-asc") {
      products.sort((a, b) => a.precio - b.precio);
    }

    if (sortOrder === "price-desc") {
      products.sort((a, b) => b.precio - a.precio);
    }

    if (sortOrder === "name-asc") {
      products.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    return products;
  }, [filteredProducts, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / productsPerPage));
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const resetPagination = () => setCurrentPage(1);

  const clearFilters = () => {
    setSearch("");
    setSelectedBrand("");
    setSelectedPriceRange("");
    setSelectedDisplacementRange("");
    setSortOrder("");
    setCurrentPage(1);
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
              Filtra por marca, precio y cilindrada. Consulta disponibilidad,
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
                  setSelectedBrand("");
                  resetPagination();
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
                    setSelectedBrand(brand);
                    resetPagination();
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

          <div className="grid gap-4 md:grid-cols-4">
            <label className="flex flex-col gap-2 text-sm font-black">
              Modelo
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  resetPagination();
                }}
                placeholder="Buscar por nombre"
                className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-black">
              Precio
              <select
                value={selectedPriceRange}
                onChange={(event) => {
                  setSelectedPriceRange(event.target.value);
                  resetPagination();
                }}
                className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Todos los precios</option>
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-black">
              Cilindrada
              <select
                value={selectedDisplacementRange}
                onChange={(event) => {
                  setSelectedDisplacementRange(event.target.value);
                  resetPagination();
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
                  setSortOrder(event.target.value);
                  resetPagination();
                }}
                className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Sin ordenar</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
                <option value="name-asc">A-Z</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
            {selectedBrand && <span>Marca: {selectedBrand}</span>}
            {selectedPrice && <span>Precio: {selectedPrice.label}</span>}
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
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagen={producto.imagen}
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
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="text-sm font-bold text-slate-500">
            Pagina {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 text-center text-sm font-medium text-slate-600">
          No encontras el modelo que buscas? Consultanos por el ingreso de
          nuevas unidades y financiacion disponible. Precio de referencia del
          catalogo: {priceFormatter.format(Math.min(...productos.map((p) => p.precio)))} a{" "}
          {priceFormatter.format(Math.max(...productos.map((p) => p.precio)))}.
        </div>
      </div>
    </section>
  );
}
