export const siteConfig = {
  brand: {
    name: "NEXO",
    product: "NEXO ONE",
    tagline: "Built for Motion.",
  },

  metadata: {
    title: "NEXO ONE â€” Built for Motion",
    description:
      "A cinematic premium sneaker experience exploring design, performance, and motion.",
  },

  navigation: [
    {
      label: "Design",
      href: "#design",
    },
    {
      label: "Technology",
      href: "#technology",
    },
    {
      label: "Performance",
      href: "#performance",
    },
    {
      label: "Colorways",
      href: "#colorways",
    },
  ],

  cta: {
    primary: {
      label: "Explore NEXO ONE",
      href: "#product",
    },
    secondary: {
      label: "Discover the Design",
      href: "#design",
    },
  },

  product: {
    name: "NEXO ONE",
    category: "Premium Performance Sneaker",
    headline: "Built for Motion.",
    description:
      "A progressive sneaker concept engineered around movement, lightweight comfort, and sculpted performance.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

