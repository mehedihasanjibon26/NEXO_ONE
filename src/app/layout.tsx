import type { Metadata } from "next";
import { Bebas_Neue, Geist } from "next/font/google";
import "lenis/dist/lenis.css";

import { ProductExperienceProvider } from "@/components/layout/ProductExperienceProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

import "./globals.css";

const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "NEXO ONE — Built for Motion",
  description:
    "A cinematic premium sneaker experience exploring design, performance, and motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${bebasNeue.variable}`}>
        <ProductExperienceProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ProductExperienceProvider>
      </body>
    </html>
  );
}
