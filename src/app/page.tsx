import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, BatteryCharging, Headphones, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SectionHeader } from "@/components/section-header";
import { products, reviews } from "@/lib/data";
import { buildMetadata, googleBusinessProfileContent, localBusinessSchema } from "@/lib/seo";

const featured = products.filter((product) => product.featured).slice(0, 4);
const latest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);

export const metadata: Metadata = buildMetadata({
  title: "Karambizi Tech Store | iPhone Rwanda & Samsung Kigali",
  description:
    "Buy original iPhones and Samsung Galaxy phones in Rwanda. Verified phones, Kigali delivery, warranty support, clear prices, and WhatsApp ordering.",
  path: "/",
});

export default function Home() {
  const jsonLd = localBusinessSchema();
  const gbp = googleBusinessProfileContent();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-line bg-background">
        <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-muted px-4 py-2 text-sm text-muted-foreground">
              <Sparkles size={16} />
              Rwanda-ready smartphone marketplace
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl leading-[1.02] tracking-normal text-foreground md:text-7xl">
                Premium Smartphones. Trusted Quality.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Buy original iPhones and Samsung Galaxy phones in Rwanda. Tugufitiye telefoni nziza kandi original ku giciro cyiza i Kigali.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 hover:shadow-xl" href="/phones?brand=Apple">
                Shop iPhones
              </Link>
              <Link className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground" href="/phones?brand=Samsung">
                Shop Samsung
              </Link>
              <Link className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5 hover:border-primary" href="/phones">
                View All Phones
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-4">
              {[
                ["4.9/5", "Trusted by customers"],
                ["1,200+", "Phones sold"],
                ["6 mo.", "Warranty available"],
                ["24-48h", "Fast delivery"],
              ].map(([value, label]) => (
                <div className="rounded-3xl border border-line bg-card p-4 text-card-foreground premium-shadow" key={label}>
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-muted" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              {featured.slice(0, 2).map((product, index) => (
                <Link className={`group rounded-[2rem] border border-line bg-card p-5 text-card-foreground premium-shadow ${index === 1 ? "sm:mt-16" : ""}`} href={`/phones/${product.slug}`} key={product.id}>
                  <Image className="aspect-[4/5] w-full rounded-[1.5rem] object-cover transition duration-300 group-hover:scale-[1.03]" src={product.images[0]} alt={product.name} width={520} height={650} priority />
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <h2 className="text-xl">{product.name}</h2>
                    </div>
                    <p className="text-sm font-semibold">{product.price.toLocaleString()} RWF</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow="Featured phones" title="Latest arrivals, best sellers, and verified upgrades." href="/phones" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Trust system" title="Every phone is checked before it reaches your hands." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [BadgeCheck, "Genuine devices", "Original iPhones and Samsung phones sourced through trusted channels."],
              [ShieldCheck, "Tested phones", "Battery, display, cameras, network, storage, and charging are verified."],
              [BatteryCharging, "Warranty support", "Clear warranty options and honest condition grading."],
              [Truck, "Fast delivery", "Kigali delivery and Rwanda-wide coordination for serious buyers."],
              [ShieldCheck, "Secure payment", "Reserve or pay with confidence after confirming device details."],
              [Headphones, "Customer support", "Direct guidance on upgrades, comparisons, and device care."],
            ].map(([Icon, title, copy]) => (
              <div className="rounded-[1.75rem] border border-line bg-card p-6 text-card-foreground" key={String(title)}>
                <Icon className="mb-6 text-accent" size={28} />
                <h3 className="text-xl">{String(title)}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{String(copy)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Why choose us</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Original devices, fair prices, and professional support.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Verified quality checks", "Affordable premium upgrades", "Clear battery health details", "Rwanda-focused delivery", "Helpful comparison advice", "Reserved device options"].map((item) => (
            <div className="flex items-center gap-3 rounded-2xl border border-line p-4" key={item}>
              <BadgeCheck className="text-accent" size={20} />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Phone brands" title="Choose your next ecosystem." dark />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ["Apple iPhones", "Premium iPhone upgrades with strong cameras, battery clarity, and verified Face ID.", "/phones?brand=Apple", products.find((p) => p.brand === "Apple")?.images[0]],
              ["Samsung Galaxy", "Flagship Galaxy phones with vibrant displays, 5G options, and flexible storage.", "/phones?brand=Samsung", products.find((p) => p.brand === "Samsung")?.images[0]],
            ].map(([title, copy, href, image]) => (
              <Link className="group relative min-h-[420px] overflow-hidden rounded-[2rem]" href={String(href)} key={String(title)}>
                <Image className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105" src={String(image)} alt={String(title)} width={900} height={700} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="text-3xl">{String(title)}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/75">{String(copy)}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow="Customer reviews" title="Realistic service built for serious phone buyers." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div className="rounded-[1.75rem] border border-line bg-card p-6 text-card-foreground premium-shadow" key={review.name}>
              <div className="flex items-center gap-4">
                <Image className="h-14 w-14 rounded-full object-cover" src={review.photo} alt={review.name} width={80} height={80} />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{"★".repeat(review.rating)}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Local SEO</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Kigali phone shop for original smartphones.</h2>
          </div>
          <div className="space-y-5 text-sm leading-7 text-muted-foreground">
            <p>{gbp.description}</p>
            <p>
              Impamvu wahitamo Karambizi Tech Store: telefone original kandi zizewe, warranty support, WhatsApp support,
              delivery in Rwanda, secure payment coordination, and honest advice before buying.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="rounded-full border border-line px-4 py-2 font-semibold text-foreground" href="/iphone-rwanda">iPhone Rwanda</Link>
              <Link className="rounded-full border border-line px-4 py-2 font-semibold text-foreground" href="/samsung-rwanda">Samsung Rwanda</Link>
              <Link className="rounded-full border border-line px-4 py-2 font-semibold text-foreground" href="/phones-kigali">Phones Kigali</Link>
              <Link className="rounded-full border border-line px-4 py-2 font-semibold text-foreground" href="/blog">Buying guides</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeader eyebrow="FAQ" title="Clear answers before you order." />
          <div className="mt-10 divide-y divide-line rounded-[2rem] border border-line bg-card text-card-foreground">
            {[
              ["Are phones original?", "Yes. Devices are inspected for authenticity, core functions, serial details, and condition before listing."],
              ["Do phones come with warranty?", "Many devices include warranty support. The exact warranty is shown on each phone page."],
              ["Can customers reserve devices?", "Yes. You can reserve available phones through WhatsApp after confirming details with the store."],
              ["What delivery options are available?", "Fast Kigali delivery is available, with Rwanda-wide coordination depending on location."],
              ["What payment methods are supported?", "Customers can coordinate mobile money, bank transfer, or cash options directly with the store."],
            ].map(([question, answer]) => (
              <details className="group p-6" key={question}>
                <summary className="cursor-pointer list-none text-lg font-semibold">{question}</summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
