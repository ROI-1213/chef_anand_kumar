import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { constructMetadata, generatePersonSchema, generateWebSiteSchema } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = generatePersonSchema();
  const webSiteJsonLd = generateWebSiteSchema();

  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="bg-obsidian text-ivory-light font-sans antialiased selection:bg-gold selection:text-obsidian flex flex-col min-h-screen">
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <main className="flex-1 relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
