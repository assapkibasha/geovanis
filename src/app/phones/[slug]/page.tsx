import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, BatteryCharging, CheckCircle2, HelpCircle, MapPin, Phone, ShieldCheck, ShoppingBag, Truck, Users } from "lucide-react";
import Link from "next/link";
import { Gallery } from "@/app/phones/[slug]/gallery";
import { ProductCard } from "@/components/product-card";
import { products, findProduct } from "@/lib/data";
import {
  breadcrumbSchema,
  buildMetadata,
  business,
  faqSchema,
  productFaqs,
  productSchema,
  productSeoDescription,
  productSeoTitle,
  relatedProducts,
  seoProductSlug,
  seoScore,
} from "@/lib/seo";
import { formatRwf } from "@/lib/utils";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: productSeoTitle(product),
    description: productSeoDescription(product),
    path: `/phones/${product.slug}`,
    image: product.images[0],
    keywords: [
      `${product.name} Rwanda`,
      `${product.name} Kigali`,
      `${product.brand} Rwanda`,
      `${product.brand} price Rwanda`,
      "original phone Rwanda",
      "telefoni original",
      "telefone nziza mu Rwanda",
    ],
  });
}

export default async function PhonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product);
  const faqs = productFaqs(product);
  const jsonLd = [
    productSchema(product),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Phones", path: "/phones" },
      { name: product.name, path: `/phones/${product.slug}` },
    ]),
    faqSchema(faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/phones">Phones Rwanda</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Gallery images={product.images} name={product.name} />
          <section className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-4 flex flex-wrap gap-2">
              {[product.availability, product.condition, `${product.warranty} warranty`, "Verified quality"].map((badge) => (
                <span className="rounded-full border border-line px-3 py-1 text-xs text-muted-foreground" key={badge}>{badge}</span>
              ))}
            </div>
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">{product.brand}</p>
            <h1 className="mt-3 text-4xl leading-tight md:text-6xl">Buy {product.name} in Rwanda</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              {product.description} Original {product.brand} phone available in Kigali with transparent price, verified condition,
              and WhatsApp ordering. Telefoni original kandi zizewe ku bakiliya bo mu Rwanda.
            </p>
            <div className="mt-8">
              <p className="text-3xl font-semibold">{formatRwf(product.price)}</p>
              <p className="mt-1 text-sm text-muted-foreground line-through">{formatRwf(product.oldPrice)}</p>
              <p className="mt-2 text-sm text-muted-foreground">SEO quality score: {seoScore(product)} / 100</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["Storage", product.storage],
                ["RAM", product.ram],
                ["Battery", product.batteryHealth],
                ["Color", product.color],
              ].map(([label, value]) => (
                <div className="rounded-2xl border border-line bg-card p-4 text-card-foreground" key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-black" href={`https://wa.me/${business.whatsapp}?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}`}>
                <ShoppingBag size={17} /> WhatsApp order
              </Link>
              <Link className="flex h-12 items-center justify-center gap-2 rounded-full border border-primary text-sm font-semibold" href={`tel:${business.phone}`}>
                <Phone size={17} /> Call now
              </Link>
              <button className="h-12 rounded-full border border-line text-sm font-semibold">Add to cart</button>
              <button className="h-12 rounded-full bg-primary text-sm font-semibold text-primary-foreground">Buy now</button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                [ShieldCheck, "Warranty badge"],
                [BadgeCheck, "Verified quality"],
                [CheckCircle2, "Secure purchase"],
                [Truck, "24-48h delivery estimate"],
              ].map(([Icon, label]) => (
                <div className="flex items-center gap-3 rounded-2xl bg-muted p-4 text-sm" key={String(label)}>
                  <Icon className="text-accent" size={19} />
                  {String(label)}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="grid gap-5 py-16 md:grid-cols-3">
          {[
            [ShieldCheck, "Why buy this phone", `${product.name} is a strong choice for Rwanda buyers who want ${product.cameraQuality.toLowerCase()} camera quality, ${product.storage} storage, ${product.batteryHealth} battery health, and clear warranty support.`],
            [Users, "Who this phone is for", `Best for Kigali customers who want an original ${product.brand} phone for work, school, content creation, business, WhatsApp, photos, and daily use.`],
            [MapPin, "Phone availability in Rwanda", `${product.availability}. Karambizi Tech Store supports Kigali delivery and Rwanda-wide coordination for serious buyers.`],
          ].map(([Icon, title, copy]) => (
            <article className="rounded-[1.75rem] border border-line bg-card p-6 text-card-foreground" key={String(title)}>
              <Icon className="mb-5 text-accent" size={24} />
              <h2 className="text-xl">{String(title)}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{String(copy)}</p>
            </article>
          ))}
        </section>

        <section className="py-16">
          <div className="mb-8 flex items-center gap-3">
            <BatteryCharging className="text-accent" />
            <h2 className="text-3xl">Detailed specifications for {product.name}</h2>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-line">
            {Object.entries(product.specs).map(([label, value]) => (
              <div className="grid gap-2 border-b border-line p-5 last:border-b-0 md:grid-cols-[260px_1fr]" key={label}>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-sm text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 pb-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Kinyarwanda SEO</p>
            <h2 className="mt-3 text-3xl">Telefoni original kandi zizewe</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Kugura {product.name} i Kigali biroroshye kuri Karambizi Tech Store. Tugufitiye telefone nziza kandi original,
              igiciro gisobanutse, garantie, n&apos;ubufasha kuri WhatsApp mbere yo gufata icyemezo.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Kugura iphone i Kigali", "Samsung zigezweho mu Rwanda", "Telefoni original kandi zizewe", "Igiciro cya phone gisobanutse"].map((item) => (
              <Link className="rounded-2xl border border-line p-4 text-sm font-semibold" href={`/${seoProductSlug(product)}`} key={item}>
                {item}
              </Link>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <div className="mb-8 flex items-center gap-3">
            <HelpCircle className="text-accent" />
            <h2 className="text-3xl">Frequently asked questions</h2>
          </div>
          <div className="divide-y divide-line rounded-[2rem] border border-line bg-card text-card-foreground">
            {faqs.map(([question, answer]) => (
              <details className="group p-6" key={question}>
                <summary className="cursor-pointer list-none text-lg font-semibold">{question}</summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <h2 className="text-3xl">Related iPhone and Samsung alternatives</h2>
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
