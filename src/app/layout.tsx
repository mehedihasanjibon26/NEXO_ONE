import type { Metadata } from "next";
import { Bebas_Neue, Geist } from "next/font/google";
import "lenis/dist/lenis.css";

import { ProductExperienceProvider } from "@/components/layout/ProductExperienceProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "NEXO ONE — Built for Motion",
  description:
    "A premium digital product experience for the NEXO ONE performance sneaker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${bebasNeue.variable}`}>
      <body>
        <ProductExperienceProvider>
          <CustomCursor />

          <SmoothScroll>{children}</SmoothScroll>
        </ProductExperienceProvider>
      </body>
    </html>
  );
}
