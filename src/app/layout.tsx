import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Evergreen Grounds Landscaping",
    template: "%s | Evergreen Grounds Landscaping",
  },
  description:
    "Professional landscape design, installation, and maintenance. Trusted, experienced crews turning outdoor spaces into lasting gardens.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <Navbar siteSettings={siteSettings} />
        <main className="flex-1">{children}</main>
        <Footer siteSettings={siteSettings} />
        <SanityLive />
      </body>
    </html>
  );
}
