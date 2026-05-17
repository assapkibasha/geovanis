import { BadgeCheck, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data";
import { productAlt } from "@/lib/seo";
import { formatRwf } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-line bg-card text-card-foreground premium-shadow">
      <Link className="block" href={`/phones/${product.slug}`}>
        <div className="relative bg-muted">
          <Image className="aspect-[4/3.8] w-full object-cover transition duration-500 group-hover:scale-105" src={product.images[0]} alt={productAlt(product)} width={700} height={650} />
          <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">-{discount}%</div>
          <button className="absolute right-4 top-4 h-10 w-10 rounded-full bg-card/95 text-card-foreground shadow-sm" aria-label="Add to wishlist">
            <Heart className="mx-auto" size={17} />
          </button>
        </div>
        <div className="space-y-4 p-5">
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">{product.brand}</p>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Star size={13} fill="currentColor" /> {product.rating}</span>
            </div>
            <h3 className="mt-2 text-xl leading-tight">{product.name} in Rwanda</h3>
          </div>
          <div>
            <p className="text-lg font-semibold">{formatRwf(product.price)}</p>
            <p className="text-sm text-muted-foreground line-through">{formatRwf(product.oldPrice)}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-2">{product.storage}</span>
            <span className="rounded-full bg-muted px-3 py-2">{product.ram} RAM</span>
            <span className="rounded-full bg-muted px-3 py-2">Battery {product.batteryHealth}</span>
            <span className="rounded-full bg-muted px-3 py-2">{product.condition}</span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><BadgeCheck size={14} /> Verified</span>
            <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">View Phone</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
