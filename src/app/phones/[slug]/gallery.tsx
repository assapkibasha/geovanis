"use client";

import Image from "next/image";
import { useState } from "react";
import { productAlt } from "@/lib/seo";
import { products } from "@/lib/data";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(images[0]);
  const product = products.find((item) => item.name === name);
  const activeIndex = Math.max(images.indexOf(active), 0);

  return (
    <div className="grid gap-4">
      <div className="overflow-hidden rounded-[2rem] border border-line bg-muted">
        <Image className="aspect-square w-full object-cover transition duration-500 hover:scale-110" src={active} alt={product ? productAlt(product, activeIndex) : `${name} original phone in Rwanda`} width={900} height={900} priority />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button className="overflow-hidden rounded-2xl border border-line bg-muted" key={image} onClick={() => setActive(image)}>
            <Image className="aspect-square w-full object-cover" src={image} alt={product ? productAlt(product, index) : `${name} thumbnail in Rwanda`} width={240} height={240} />
          </button>
        ))}
      </div>
    </div>
  );
}
