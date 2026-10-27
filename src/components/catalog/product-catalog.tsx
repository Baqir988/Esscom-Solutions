"use client";
import { useRef, useState } from "react";
import { Search, RotateCcw, SearchX } from "lucide-react";
import type { CatalogItem, CatalogFilters, CatalogSort } from "@/types/catalog";
import {
  catalogCategories,
  defaultCatalogFilters,
  filterCatalog,
} from "@/lib/catalog";
import { ProductGrid } from "./product-card";
import { useHydrated } from "@/hooks/use-hydrated";

export function ProductCatalog({ items }: { items: CatalogItem[] }) {
  const hydrated = useHydrated();
  const [filters, setFilters] = useState<CatalogFilters>(defaultCatalogFilters);
  const searchRef = useRef<HTMLInputElement>(null);
  const categories = catalogCategories(items);
  const results = filterCatalog(items, filters);
  const equipmentOnly = items.every(
    (item) => item.kind === "equipment-category",
  );
  const changed =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.sort !== "name-asc";
  const reset = () => {
    setFilters({ ...defaultCatalogFilters });
    searchRef.current?.focus();
  };
  return (
    <div className="catalog-browser" id="catalog-browser">
      <div
        className="catalog-toolbar"
        role="search"
        aria-label="Equipment and product catalog"
      >
        <div className="filter-field search-field">
          <label htmlFor="catalog-search">
            Search {equipmentOnly ? "equipment" : "products"}
          </label>
          <div className="search-input">
            <Search size={19} aria-hidden="true" />
            <input
              ref={searchRef}
              id="catalog-search"
              disabled={!hydrated}
              type="search"
              placeholder={
                equipmentOnly
                  ? "Try RFID, camera, or queue…"
                  : "Name, model, or keyword…"
              }
              value={filters.search}
              onChange={(event) =>
                setFilters({ ...filters, search: event.target.value })
              }
              aria-controls="catalog-results"
            />
          </div>
        </div>
        <div className="filter-field">
          <label htmlFor="catalog-category">Category</label>
          <select
            id="catalog-category"
            disabled={!hydrated}
            value={filters.category}
            onChange={(event) =>
              setFilters({ ...filters, category: event.target.value })
            }
            aria-controls="catalog-results"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="catalog-sort">Sort by</label>
          <select
            id="catalog-sort"
            disabled={!hydrated}
            value={filters.sort}
            onChange={(event) =>
              setFilters({
                ...filters,
                sort: event.target.value as CatalogSort,
              })
            }
            aria-controls="catalog-results"
          >
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
      <div className="results-bar">
        <p role="status" aria-live="polite" aria-atomic="true">
          <strong>{results.length}</strong> of {items.length}{" "}
          {equipmentOnly ? "equipment categories" : "products"}
          {filters.search.trim() && <> matching “{filters.search.trim()}”</>}
        </p>
        <button
          type="button"
          className="filter-reset"
          onClick={reset}
          disabled={!changed}
        >
          <RotateCcw size={16} aria-hidden="true" />
          Clear filters
        </button>
      </div>
      <div id="catalog-results">
        {results.length ? (
          <ProductGrid items={results} />
        ) : (
          <div className="collection-empty">
            <SearchX size={34} strokeWidth={1.5} aria-hidden="true" />
            <h3>
              No matching {equipmentOnly ? "equipment categories" : "products"}.
            </h3>
            <p>
              Try a broader keyword or select another category. You can also
              reset the filters to browse the complete collection.
            </p>
            <button
              className="button button-primary"
              type="button"
              onClick={reset}
            >
              Reset search & filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
