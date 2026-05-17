import type { Metadata } from "next";
import { MarketplaceClient } from "@/app/phones/marketplace-client";
import { products } from "@/lib/data";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Phones in Rwanda | iPhones & Samsung Galaxy Kigali",
  description:
    "Browse original phones in Rwanda from Karambizi Tech Store. Compare iPhone and Samsung prices, storage, battery health, warranty, and Kigali availability.",
  path: "/phones",
  keywords: ["phones in Rwanda", "smartphones Kigali", "iPhone price Rwanda", "Samsung price Rwanda", "telefone nziza mu Rwanda"],
});

export default async function PhonesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const brand = typeof params.brand === "string" ? params.brand : undefined;
  const initialProducts = brand ? products.filter((product) => product.brand === brand) : products;
  const jsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Phones", path: "/phones" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketplaceClient initialProducts={initialProducts} />
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="rounded-[1.75rem] border border-line bg-card p-6 text-card-foreground">
          <h2 className="text-2xl">Original phones in Rwanda and Kigali</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Buy original iPhone and Samsung phones in Rwanda with verified quality, clear prices, battery health details,
            and warranty support. Tugufitiye telefoni nziza kandi original, Samsung zigezweho, iphone zigezweho,
            n&apos;ubufasha bwo kugura phone i Kigali kuri WhatsApp.
          </p>
        </div>
      </section>
    </>
  );
}
