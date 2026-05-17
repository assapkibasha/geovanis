import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Rwanda Smartphone Buying Guides",
  description:
    "Read Karambizi Tech Store guides about iPhone Rwanda prices, Samsung Rwanda comparisons, original phones, batteries, cameras, and Kigali buying tips.",
  path: "/blog",
  keywords: ["iPhone Rwanda blog", "Samsung Rwanda guide", "smartphone prices Rwanda", "telefoni nziza"],
});

export default function BlogPage() {
  const jsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <section className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Rwanda phone guides</p>
          <h1 className="mt-3 text-4xl leading-tight md:text-6xl">Smartphone buying advice for Kigali and Rwanda</h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Learn how to choose original iPhones and Samsung Galaxy phones, compare prices, protect your battery,
            and avoid fake devices. Telefoni nziza, telefone original, n&apos;ibiciro bisobanutse.
          </p>
        </section>
        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article className="rounded-[1.75rem] border border-line bg-card p-6 text-card-foreground" key={post.slug}>
              <h2 className="text-2xl leading-tight">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.description}</p>
              <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" href={`/blog/${post.slug}`}>
                Read guide <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
