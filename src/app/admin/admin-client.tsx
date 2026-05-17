"use client";

import { ImagePlus, PackageCheck, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/lib/data";
import { formatRwf } from "@/lib/utils";

const inventory = ["In stock", "Out of stock", "Reserved", "Sold"];

export function AdminClient() {
  const [selected, setSelected] = useState(products[0]);
  const stats = useMemo(
    () => [
      ["Active phones", products.length],
      ["In stock", products.filter((product) => product.availability === "In stock").length],
      ["Reserved", products.filter((product) => product.availability === "Reserved").length],
      ["Sold this month", products.reduce((sum, product) => sum + product.sold, 0)],
    ],
    [],
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Dashboard</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Inventory management</h1>
        </div>
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
          <Save size={17} /> Publish updates
        </button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map(([label, value]) => (
          <div className="rounded-[1.5rem] border border-line bg-card p-5 text-card-foreground premium-shadow" key={label}>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-line bg-card p-5 text-card-foreground">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl">Phones</h2>
            <PackageCheck size={21} />
          </div>
          <div className="grid gap-3">
            {products.map((product) => (
              <button className="rounded-2xl border border-line p-4 text-left hover:border-primary" key={product.id} onClick={() => setSelected(product)}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{product.storage} · {product.batteryHealth} battery · {product.availability}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatRwf(product.price)}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="rounded-[2rem] border border-line bg-card p-6 text-card-foreground">
          <h2 className="text-2xl">Add or edit phone</h2>
          <form className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Phone name", selected.name],
                ["Brand", selected.brand],
                ["Price", String(selected.price)],
                ["Old price", String(selected.oldPrice)],
                ["Battery health", selected.batteryHealth],
                ["Storage", selected.storage],
                ["RAM", selected.ram],
                ["Color", selected.color],
              ].map(([label, value]) => (
                <label className="grid gap-2 text-sm" key={label}>
                  {label}
                  <input className="h-12 rounded-2xl border border-line bg-background px-4 outline-none focus:border-primary" defaultValue={value} />
                </label>
              ))}
            </div>
            <label className="grid gap-2 text-sm">
              Description
              <textarea className="min-h-28 rounded-2xl border border-line bg-background p-4 outline-none focus:border-primary" defaultValue={selected.description} />
            </label>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="grid gap-2 text-sm">
                Condition
                <select className="h-12 rounded-2xl border border-line bg-background px-4">
                  {["New", "Excellent", "Very Good", "Good"].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                Availability
                <select className="h-12 rounded-2xl border border-line bg-background px-4">
                  {inventory.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                Featured
                <select className="h-12 rounded-2xl border border-line bg-background px-4">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </label>
            </div>
            <div className="rounded-[1.5rem] border border-dashed border-line bg-muted p-8 text-center">
              <ImagePlus className="mx-auto" size={32} />
              <p className="mt-3 font-semibold">Drag and drop phone images</p>
              <p className="mt-2 text-sm text-muted-foreground">Multiple images, Cloudinary upload, and compression-ready endpoint.</p>
              <input className="mt-4 text-sm" multiple type="file" accept="image/*" />
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground" type="button">
                <Save size={17} /> Save phone
              </button>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-semibold" type="button">
                <Trash2 size={17} /> Delete
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
