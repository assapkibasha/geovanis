"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/data";

const filterGroups = {
  brand: ["Apple", "Samsung"],
  storage: ["128GB", "256GB", "512GB"],
  ram: ["4GB", "6GB", "8GB", "12GB"],
  condition: ["New", "Excellent", "Very Good", "Good"],
  cameraQuality: ["Pro", "Flagship", "Advanced"],
};

type SortKey = "Latest" | "Lowest price" | "Highest price" | "Best selling" | "Most viewed";

export function MarketplaceClient({ initialProducts }: { initialProducts: Product[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("Latest");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [maxPrice, setMaxPrice] = useState(1600000);
  const [only5g, setOnly5g] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    const active = initialProducts.filter((product) => {
      const q = query.toLowerCase();
      const matchesQuery = [product.name, product.model, product.brand, product.storage, product.color].join(" ").toLowerCase().includes(q);
      const matchesFilters = Object.entries(filters).every(([key, values]) => {
        if (!values.length) return true;
        return values.includes(String(product[key as keyof Product]));
      });
      return matchesQuery && matchesFilters && product.price <= maxPrice && (!only5g || product.support5g);
    });

    return [...active].sort((a, b) => {
      if (sort === "Lowest price") return a.price - b.price;
      if (sort === "Highest price") return b.price - a.price;
      if (sort === "Best selling") return b.sold - a.sold;
      if (sort === "Most viewed") return b.views - a.views;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [filters, initialProducts, maxPrice, only5g, query, sort]);

  function toggle(key: string, value: string) {
    setFilters((current) => {
      const values = current[key] ?? [];
      return {
        ...current,
        [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value],
      };
    });
  }

  const sidebar = (
    <aside className="space-y-8 rounded-[1.5rem] border border-line bg-card p-5 text-card-foreground">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <SlidersHorizontal size={18} />
      </div>
      <div>
        <label className="text-sm font-semibold">Price up to {maxPrice.toLocaleString()} RWF</label>
        <input className="mt-4 w-full accent-primary" type="range" min={300000} max={1600000} step={50000} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
      </div>
      {Object.entries(filterGroups).map(([key, values]) => (
        <div key={key}>
          <h3 className="mb-3 text-sm font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
          <div className="grid gap-2">
            {values.map((value) => (
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line px-3 py-2 text-sm" key={value}>
                <input className="accent-primary" type="checkbox" checked={(filters[key] ?? []).includes(value)} onChange={() => toggle(key, value)} />
                {value}
              </label>
            ))}
          </div>
        </div>
      ))}
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line px-3 py-3 text-sm">
        <input className="accent-primary" type="checkbox" checked={only5g} onChange={(event) => setOnly5g(event.target.checked)} />
        5G support
      </label>
    </aside>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Marketplace</p>
          <h1 className="mt-2 text-4xl md:text-5xl">All phones</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input className="h-12 rounded-full border border-line bg-card px-5 text-sm text-card-foreground outline-none focus:border-primary" placeholder="Search iPhone, Samsung, storage..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <select className="h-12 rounded-full border border-line bg-card px-5 text-sm text-card-foreground outline-none" value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            {["Latest", "Lowest price", "Highest price", "Best selling", "Most viewed"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button className="h-12 rounded-full border border-line px-5 text-sm md:hidden" onClick={() => setMobileFilters(true)}>
            Filters
          </button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">{sidebar}</div>
        <section>
          <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
            <span>{filtered.length} verified phones</span>
            <span>Compare, wishlist, and reserve available devices</span>
          </div>
          <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </motion.div>
        </section>
      </div>
      {mobileFilters ? (
        <div className="fixed inset-0 z-50 bg-black/40 p-4 lg:hidden">
          <div className="ml-auto h-full max-w-sm overflow-y-auto rounded-[1.5rem] bg-background p-4">
            <button className="mb-4 ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-line" onClick={() => setMobileFilters(false)} aria-label="Close filters">
              <X size={18} />
            </button>
            {sidebar}
          </div>
        </div>
      ) : null}
    </div>
  );
}
