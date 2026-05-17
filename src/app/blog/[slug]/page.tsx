import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import { blogPosts, breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const featured = products.slice(0, 3);
  const faqs: Array<[string, string]> = [
    ["Where can I buy original phones in Rwanda?", "Karambizi Tech Store sells verified iPhones and Samsung Galaxy phones in Kigali with warranty support and WhatsApp ordering."],
    ["Ese telefoni zigurishwa ni original?", "Yego. Karambizi Tech Store igenzura telefone mbere yo kuyigurisha kugira ngo umukiliya abone telefone original kandi yizewe."],
    ["Do prices change in Rwanda?", "Yes. Smartphone prices in Rwanda can change based on model, storage, condition, demand, warranty, and exchange rates."],
  ];
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    faqSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      mainEntityOfPage: `/blog/${post.slug}`,
      author: { "@type": "Organization", name: "Karambizi Tech Store" },
      publisher: { "@type": "Organization", name: "Karambizi Tech Store" },
      inLanguage: ["en-RW", "rw"],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/blog">Blog</Link>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Karambizi Tech Store guide</p>
        <h1 className="mt-3 text-4xl leading-tight md:text-6xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{post.description}</p>

        <section className="mt-12 space-y-5 text-base leading-8 text-muted-foreground">
          <h2 className="text-3xl text-foreground">What Rwanda buyers should check first</h2>
          <p>
            Before buying a phone in Rwanda, compare originality, storage, battery health, camera quality, warranty,
            and Kigali availability. A cheaper phone is not always better if Face ID, charging, network, screen,
            or battery performance has not been tested.
          </p>
          <p>
            Mu Kinyarwanda: hitamo telefone original, reba battery health, camera, storage, condition, garantie,
            n&apos;igiciro cya phone mbere yo kwishyura.
          </p>
          <h2 className="text-3xl text-foreground">Best internal links for phone shoppers</h2>
          <p>
            Start with <Link className="font-semibold text-foreground" href="/iphone-rwanda">iPhone Rwanda</Link>,
            {" "}<Link className="font-semibold text-foreground" href="/samsung-rwanda">Samsung Rwanda</Link>, or
            {" "}<Link className="font-semibold text-foreground" href="/phones-kigali">smartphones Kigali</Link> pages.
            These pages group phones by buyer intent and make it easier to compare prices.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl">Recommended phones</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-line rounded-[2rem] border border-line bg-card text-card-foreground">
            {faqs.map(([question, answer]) => (
              <details className="p-6" key={question}>
                <summary className="cursor-pointer list-none text-lg font-semibold">{question}</summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
