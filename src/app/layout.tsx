import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { buildMetadata, localBusinessSchema, organizationSchema } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Karambizi Tech Store | Original iPhones & Samsung Phones in Rwanda",
    description:
      "Buy original iPhones and Samsung Galaxy phones in Rwanda. Karambizi Tech Store offers verified smartphones, Kigali delivery, warranty support, and WhatsApp ordering.",
    path: "/",
  }),
  title: {
    default: "Karambizi Tech Store | Original iPhones & Samsung Phones in Rwanda",
    template: "%s | Karambizi Tech Store",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
  category: "Ecommerce",
  applicationName: "Karambizi Tech Store",
  appleWebApp: {
    capable: true,
    title: "Karambizi Tech Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSchema = [organizationSchema(), localBusinessSchema()];

  return (
    <html lang="en-RW" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }} />
        <Providers>
          <Analytics />
          <Suspense>
            <Navbar />
          </Suspense>
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
