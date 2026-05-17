import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import {
  breadcrumbSchema,
  buildMetadata,
  business,
  getProductBySeoSlug,
  localLandingPages,
  productSchema,
  productSeoDescription,
  productSeoTitle,
  relatedProducts,
  seoProductSlug,
} from "@/lib/seo";
import { formatRwf } from "@/lib/utils";

function pathFromParams(slug: string[]) {
  return slug.join("/");
}

export function generateStaticParams() {
  return [
    ...localLandingPages.map((page) => ({ slug: page.slug.split("/") })),
    ...products.map((product) => ({ slug: [seoProductSlug(product)] })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const path = pathFromParams((await params).slug);
  const landing = localLandingPages.find((page) => page.slug === path);
  if (landing) {
    return buildMetadata({
      title: landing.title,
      description: landing.description,
      path: `/${landing.slug}`,
      keywords: [landing.focus, "Rwanda phone shop", "Kigali smartphone store", "telefoni nziza", "telefone original"],
    });
  }

  const product = getProductBySeoSlug(path);
  if (!product) return {};
  return buildMetadata({
    title: productSeoTitle(product),
    description: productSeoDescription(product),
    path: `/${seoProductSlug(product)}`,
    image: product.images[0],
    keywords: [`${product.name} Rwanda`, `${product.name} Kigali`, `${product.brand} Rwanda`, "telefone original"],
  });
}

export default async function SeoPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const path = pathFromParams((await params).slug);
  const landing = localLandingPages.find((page) => page.slug === path);

  if (landing) {
    const landingProducts = products.filter((product) => (landing.brands as readonly string[]).includes(product.brand)).slice(0, 6);
    const jsonLd = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: landing.h1, path: `/${landing.slug}` },
    ]);

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="text-foreground">{landing.h1}</span>
          </nav>
          <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">{landing.focus}</p>
              <h1 className="mt-3 text-4xl leading-tight md:text-6xl">{landing.h1}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                {landing.description} {landing.kinyarwanda}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground" href="/phones">
                  Browse phones
                </Link>
                <Link className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-black" href={`https://wa.me/${business.whatsapp}?text=Hello%20Karambizi%2C%20I%20want%20to%20buy%20a%20phone%20in%20Rwanda.`}>
                  WhatsApp
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [ShieldCheck, "Original verified phones"],
                [Truck, "Kigali and Rwanda delivery"],
                [MessageCircle, "English + Kinyarwanda support"],
                [MapPin, "Gasabo, Kicukiro, Nyarugenge"],
              ].map(([Icon, label]) => (
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4 text-sm text-card-foreground" key={String(label)}>
                  <Icon className="text-accent" size={19} />
                  {String(label)}
                </div>
              ))}
            </div>
          </section>

          <section className="py-16">
            <h2 className="text-3xl">Available phones for Rwanda buyers</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {landingProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </section>

          <section className="grid gap-5 pb-16 md:grid-cols-3">
            {[
              ["Impamvu wahitamo Karambizi Tech Store", "Tugufasha kugura telefone original, tukagusobanurira igiciro, condition, battery, storage, na garantie."],
              ["Telefoni original kandi zizewe", "Buri phone igenzurwa camera, screen, network, charging, storage, battery health, na performance."],
              ["Kugura phone i Kigali", "Ushobora kutwandikira kuri WhatsApp, ugahitamo iPhone cyangwa Samsung, hanyuma tukagufasha kuyibona i Kigali."],
            ].map(([title, copy]) => (
              <article className="rounded-[1.75rem] border border-line bg-card p-6 text-card-foreground" key={title}>
                <h2 className="text-xl">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </section>
        </div>
      </>
    );
  }

  const product = getProductBySeoSlug(path);
  if (!product) notFound();
  const related = relatedProducts(product);
  const jsonLd = [
    productSchema(product),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: product.name, path: `/${seoProductSlug(product)}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <ProductCard product={product} />
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">{product.brand} Rwanda</p>
            <h1 className="mt-3 text-4xl leading-tight md:text-6xl">Buy {product.name} in Rwanda</h1>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Original {product.name} {product.storage} available from Karambizi Tech Store in Kigali. {product.condition} condition,
              {` ${product.batteryHealth}`} battery health, {product.warranty} warranty, and WhatsApp ordering for Rwanda buyers.
              Telefoni original kandi zizewe ku giciro cya {formatRwf(product.price)}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground" href={`/phones/${product.slug}`}>
                View full details
              </Link>
              <Link className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-black" href={`https://wa.me/${business.whatsapp}?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}`}>
                Order on WhatsApp
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16">
          <h2 className="text-3xl">Related phones in Rwanda</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
