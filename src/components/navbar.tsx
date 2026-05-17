"use client";

import { Heart, Menu, Moon, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "All Phones", href: "/phones", match: "phones" },
  { label: "iPhones", href: "/shop/iphones", match: "iphones" },
  { label: "Samsung", href: "/shop/samsung", match: "samsung" },
  { label: "Blog", href: "/blog", match: "blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");

  function isActive(match: string) {
    if (match === "phones") return pathname === "/phones" && !brand;
    return pathname.includes(match);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7e9ed] bg-white text-[#060606]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link className="flex h-14 w-[210px] items-center overflow-hidden sm:h-16 sm:w-[235px]" href="/" aria-label="Karambizi Tech Store home">
          <Image
            className="h-full w-full scale-170 object-contain object-center"
            src="/logo_transparent.png"
            alt="Karambizi"
            width={1516}
            height={1004}
            priority
          />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map(({ label, href, match }) => {
            const active = isActive(match);
            return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cn(
                "border-b-2 px-1 pb-2 text-sm hover:text-[#060606]",
                active ? "border-[#008f35] text-[#060606]" : "border-transparent text-[#5f6670]",
              )}
              href={href}
              key={label}
            >
              {label}
            </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <Link className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#e7e9ed] text-[#060606] hover:bg-[#f5f6f7] md:flex" href="/phones" aria-label="Search phones">
            <Search size={18} />
          </Link>
          <button className="h-10 w-10 rounded-full border border-[#e7e9ed] text-[#060606] hover:bg-[#f5f6f7]" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
            <Moon className="mx-auto" size={17} />
          </button>
          <Link className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#e7e9ed] text-[#060606] hover:bg-[#f5f6f7] sm:flex" href="/phones?wishlist=true" aria-label="Wishlist">
            <Heart size={17} />
          </Link>
          <Link className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#050505] text-white hover:-translate-y-0.5 sm:flex" href="/phones" aria-label="Cart">
            <ShoppingBag size={17} />
          </Link>
          <button className="h-10 w-10 rounded-full border border-[#e7e9ed] text-[#060606] md:hidden" aria-label="Open menu" onClick={() => setOpen((value) => !value)}>
            <Menu className="mx-auto" size={19} />
          </button>
        </div>
      </nav>
      <div className={cn("border-t border-[#e7e9ed] bg-white px-5 py-4 md:hidden", open ? "block" : "hidden")}>
        <div className="mx-auto grid max-w-7xl gap-3">
          {links.map(({ label, href, match }) => (
            <Link
              aria-current={isActive(match) ? "page" : undefined}
              className={cn(
                "rounded-2xl border-b-2 bg-[#f5f6f7] px-4 py-3 text-sm",
                isActive(match) ? "border-[#008f35] text-[#060606]" : "border-transparent text-[#5f6670]",
              )}
              href={href}
              key={label}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
