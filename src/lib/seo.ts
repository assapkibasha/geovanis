import type { Metadata } from "next";
import type { Product } from "@/lib/data";
import { products, reviews } from "@/lib/data";
import { formatRwf, slugify } from "@/lib/utils";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://karambizi.tech";

export const business = {
  name: "Karambizi Tech Store",
  legalName: "Karambizi Tech Store",
  phone: "+250784616862",
  whatsapp: "250784616862",
  email: "sales@karambizi.tech",
  address: "Kigali, Rwanda",
  city: "Kigali",
  country: "RW",
  districts: ["Gasabo", "Kicukiro", "Nyarugenge"],
  latitude: -1.9441,
  longitude: 30.0619,
  priceRange: "RWF 300,000 - RWF 1,600,000",
  sameAs: ["https://wa.me/250784616862"],
};

export const coreKeywords = [
  "iPhone Rwanda",
  "Samsung Rwanda",
  "phones in Rwanda",
  "smartphones Kigali",
  "buy iPhone Kigali",
  "buy Samsung Rwanda",
  "used iPhone Rwanda",
  "original iPhone Rwanda",
  "Samsung Galaxy Kigali",
  "iPhone price Rwanda",
  "Samsung price Rwanda",
  "telefoni nziza",
  "kugura iphone mu Rwanda",
  "iphone i Kigali",
  "samsung i Kigali",
  "telefoni original",
  "telefone nziza mu Rwanda",
];

export const localLandingPages = [
  {
    slug: "iphone-rwanda",
    title: "Buy Original iPhone in Rwanda",
    h1: "Buy Original iPhone in Rwanda",
    focus: "iPhone Rwanda",
    description:
      "Buy original iPhone in Rwanda from Karambizi Tech Store. Verified iPhones, fair Kigali prices, warranty support, and WhatsApp ordering.",
    kinyarwanda:
      "Kugura iphone mu Rwanda biroroshye: tugufitiye iphone nziza kandi original ku giciro cyiza i Kigali.",
    brands: ["Apple"],
  },
  {
    slug: "samsung-rwanda",
    title: "Buy Samsung Galaxy Phones in Rwanda",
    h1: "Buy Samsung Galaxy Phones in Rwanda",
    focus: "Samsung Rwanda",
    description:
      "Shop original Samsung Galaxy phones in Rwanda with warranty, verified quality checks, Kigali delivery, and direct WhatsApp support.",
    kinyarwanda: "Samsung zigezweho mu Rwanda, telefone original, garantie, n'ubufasha bwo guhitamo neza.",
    brands: ["Samsung"],
  },
  {
    slug: "phones-kigali",
    title: "Smartphones in Kigali",
    h1: "Smartphones in Kigali",
    focus: "smartphones Kigali",
    description:
      "Find iPhones and Samsung smartphones in Kigali with clear prices, verified condition, warranty options, and fast local delivery.",
    kinyarwanda: "Aho wagura iphone na Samsung i Kigali: telefoni nziza kandi original zigenzuwe mbere yo kugurishwa.",
    brands: ["Apple", "Samsung"],
  },
  {
    slug: "smartphones-rwanda",
    title: "Original Smartphones in Rwanda",
    h1: "Original Smartphones in Rwanda",
    focus: "smartphones Rwanda",
    description:
      "Compare original smartphones in Rwanda, including iPhones and Samsung Galaxy models, with trusted advice and transparent prices.",
    kinyarwanda: "Telefoni nziza mu Rwanda, smartphone nziza, igiciro cyiza, na garantie ku bicuruzwa byizewe.",
    brands: ["Apple", "Samsung"],
  },
  {
    slug: "shop/iphones",
    title: "iPhone Shop in Rwanda",
    h1: "iPhone Shop in Rwanda",
    focus: "iPhone shop Rwanda",
    description:
      "Browse original iPhones available in Rwanda. Karambizi Tech Store lists verified Apple phones with battery health and warranty details.",
    kinyarwanda: "iPhone zigezweho i Kigali, original kandi zifite amakuru asobanutse kuri battery na garantie.",
    brands: ["Apple"],
  },
  {
    slug: "shop/samsung",
    title: "Samsung Shop in Rwanda",
    h1: "Samsung Shop in Rwanda",
    focus: "Samsung shop Rwanda",
    description:
      "Browse Samsung Galaxy phones in Rwanda with verified specs, storage options, warranty, and Kigali WhatsApp ordering.",
    kinyarwanda: "Samsung zigezweho i Kigali, telefoni original kandi zizewe ku giciro cyiza.",
    brands: ["Samsung"],
  },
  {
    slug: "phones/used-iphones-rwanda",
    title: "Used iPhones in Rwanda",
    h1: "Used iPhones in Rwanda",
    focus: "used iPhone Rwanda",
    description:
      "Shop clean used iPhones in Rwanda with battery health checks, Face ID verification, warranty options, and honest condition grading.",
    kinyarwanda: "iPhone zakoreshejwe neza, zigenzuwe, zifite battery health igaragara na garantie.",
    brands: ["Apple"],
  },
] as const;

export const blogPosts = [
  {
    slug: "best-iphones-rwanda-2026",
    title: "Best iPhones in Rwanda 2026",
    description:
      "Compare the best iPhones to buy in Rwanda in 2026, including price, battery health, camera quality, warranty, and Kigali availability.",
    keywords: ["Best iPhones in Rwanda 2026", "iPhone price Rwanda", "iphone zigezweho"],
  },
  {
    slug: "samsung-vs-iphone-rwanda",
    title: "Samsung vs iPhone in Rwanda",
    description:
      "A Rwanda buyer guide comparing Samsung Galaxy and iPhone models for camera, battery, resale value, repairs, and daily use.",
    keywords: ["Samsung vs iPhone Rwanda", "Samsung Rwanda", "iPhone Rwanda"],
  },
  {
    slug: "how-to-choose-good-smartphone-rwanda",
    title: "How to Choose a Good Smartphone in Rwanda",
    description:
      "Learn how to choose a reliable smartphone in Rwanda by checking storage, battery, camera, network support, warranty, and originality.",
    keywords: ["good smartphone Rwanda", "telefoni nziza", "smartphone nziza"],
  },
  {
    slug: "best-camera-phones-kigali",
    title: "Best Camera Phones in Kigali",
    description:
      "Find the best camera phones in Kigali, from iPhone Pro models to Samsung Ultra phones, with tips for photos, video, and storage.",
    keywords: ["best camera phones Kigali", "iPhone 14 Pro Kigali", "Samsung Galaxy Kigali"],
  },
  {
    slug: "original-vs-fake-iphones-rwanda",
    title: "Original vs Fake iPhones in Rwanda",
    description:
      "How to spot original iPhones in Rwanda using serial checks, Face ID, battery health, display quality, camera tests, and warranty proof.",
    keywords: ["original iPhone Rwanda", "fake iPhone Rwanda", "telefone original"],
  },
  {
    slug: "smartphone-prices-rwanda",
    title: "Smartphone Prices in Rwanda",
    description:
      "Understand iPhone and Samsung prices in Rwanda, what affects phone value, and how to compare storage, condition, and warranty.",
    keywords: ["smartphone prices Rwanda", "igiciro cya iphone", "igiciro cya samsung"],
  },
  {
    slug: "protect-phone-battery",
    title: "How to Protect Your Phone Battery",
    description:
      "Practical battery care tips for iPhone and Samsung users in Rwanda, including charging habits, heat protection, and settings.",
    keywords: ["protect phone battery", "iPhone battery Rwanda", "Samsung battery tips"],
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function seoProductSlug(product: Product) {
  const suffix = product.brand === "Apple" ? "rwanda" : "kigali";
  return slugify(`${product.name} ${suffix}`);
}

export function getProductBySeoSlug(slug: string) {
  return products.find((product) => seoProductSlug(product) === slug);
}

export function productAlt(product: Product, index = 0) {
  const detail = index === 0 ? "front view" : `image ${index + 1}`;
  return `${product.name} ${product.storage} ${product.color} original phone in Rwanda ${detail}`;
}

export function productSeoTitle(product: Product) {
  const location = product.brand === "Apple" ? "Rwanda" : "Kigali";
  return `Buy ${product.name} in ${location} | Karambizi Tech Store`;
}

export function productSeoDescription(product: Product) {
  return `Buy original ${product.name} ${product.storage} in Rwanda from Karambizi Tech Store. ${product.condition} condition, ${product.warranty} warranty, Kigali delivery, WhatsApp now.`;
}

export function buildMetadata({
  title,
  description,
  path,
  image = "/logo_transparent.png",
  keywords = coreKeywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: readonly string[];
}): Metadata {
  const url = absoluteUrl(path);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [...keywords],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      locale: "en_RW",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    legalName: business.legalName,
    url: siteUrl,
    logo: absoluteUrl("/logo_transparent.png"),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phone,
      contactType: "sales",
      areaServed: "RW",
      availableLanguage: ["English", "Kinyarwanda"],
    },
    sameAs: business.sameAs,
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    name: business.name,
    image: absoluteUrl("/logo_transparent.png"),
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: "Kigali",
      addressCountry: business.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.latitude,
      longitude: business.longitude,
    },
    areaServed: ["Rwanda", "Kigali", ...business.districts],
    paymentAccepted: ["Cash", "Mobile Money", "Bank Transfer"],
    currenciesAccepted: "RWF",
    sameAs: business.sameAs,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${product.storage} ${product.color}`,
    brand: { "@type": "Brand", name: product.brand },
    model: product.model,
    sku: product.id,
    image: product.images,
    description: productSeoDescription(product),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    review: reviews.slice(0, 2).map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
      reviewBody: review.text,
    })),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/phones/${product.slug}`),
      priceCurrency: "RWF",
      price: product.price,
      priceValidUntil: "2026-12-31",
      availability: product.availability === "In stock" ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability",
      itemCondition: product.condition === "New" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
      seller: { "@type": "ElectronicsStore", name: business.name },
    },
  };
}

export function faqSchema(faqs: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function productFaqs(product: Product): Array<[string, string]> {
  return [
    [`Is the ${product.name} original?`, `Yes. This ${product.name} is verified for originality, network support, camera, storage, and core functions before listing.`],
    ["Ese iyi telefone ni original?", "Yego. Telefoni zacu turazigenzura mbere yo kuzigurisha kugira ngo umukiliya abone telefone original kandi yizewe."],
    ["Mutanga garantie?", `Yego. Iyi telefone ifite ${product.warranty} warranty support nk'uko bigaragara ku rupapuro rwayo.`],
    ["Mugeza telefone aho umukiliya ari?", "Dutanga delivery i Kigali kandi dufasha abakiliya bo mu Rwanda guhabwa telefone bitewe n'aho baherereye."],
  ];
}

export function relatedProducts(product: Product, limit = 3) {
  return products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const brandScore = Number(b.brand === product.brand) - Number(a.brand === product.brand);
      if (brandScore) return brandScore;
      return Math.abs(a.price - product.price) - Math.abs(b.price - product.price);
    })
    .slice(0, limit);
}

export function seoScore(product: Product) {
  const checks = [
    product.name,
    product.description.length > 80,
    product.images.length >= 3,
    product.specs.Camera,
    product.specs.Display,
    product.warranty,
    product.rating >= 4,
    product.reviews > 10,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export function googleBusinessProfileContent() {
  return {
    description:
      "Karambizi Tech Store sells original iPhones and Samsung Galaxy phones in Kigali, Rwanda. Customers can compare verified smartphones, battery health, storage, condition, warranty options, and prices before ordering through WhatsApp.",
    services: ["iPhone sales", "Samsung Galaxy sales", "Used iPhones", "Smartphone delivery in Kigali", "Phone warranty support", "Phone buying advice"],
    products: products.slice(0, 6).map((product) => `${product.name} ${product.storage} - ${formatRwf(product.price)}`),
    keywords: coreKeywords,
  };
}
