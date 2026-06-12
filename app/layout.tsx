import type { Metadata } from "next";
import { Barlow_Condensed, Barlow, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Shamal (T) Limited",
    default: "Shamal (T) Limited — Construction & Logistics Tanzania",
  },
  description:
    "Premier construction and logistics company in Tanzania. Roads, bridges, buildings, and freight management. Dar es Salaam, Tanzania.",
  keywords: [
    "construction Tanzania",
    "road construction",
    "bridge construction",
    "logistics Tanzania",
    "Dar es Salaam contractor",
  ],
  openGraph: {
    type: "website",
    siteName: "Shamal (T) Limited",
    url: "https://www.shamalcotz.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-white px-4 py-2 z-[100]"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
