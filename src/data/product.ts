import type { Product } from "@/types/product";

export const nexoOne: Product = {
  id: "nexo-one",
  name: "NEXO ONE",
  category: "Premium Performance Sneaker",
  tagline: "Built for Motion.",
  description:
    "A progressive sneaker concept engineered around lightweight comfort, responsive cushioning, and sculpted everyday performance.",
  price: 220,

  colorways: [
    {
      id: "onyx-black",
      name: "Onyx Black",
      label: "ONYX",
      hex: "#111111",
      textColor: "#F5F5F2",
      image: "/images/product/nexo-one-onyx.webp",
    },
    {
      id: "chalk-white",
      name: "Chalk White",
      label: "CHALK",
      hex: "#E8E6DF",
      textColor: "#111111",
      image: "/images/product/nexo-one-chalk.webp",
    },
    {
      id: "silver-mist",
      name: "Silver Mist",
      label: "SILVER",
      hex: "#A9AAAD",
      textColor: "#111111",
      image: "/images/product/nexo-one-silver.webp",
    },
    {
      id: "volt-red",
      name: "Volt Red",
      label: "VOLT",
      hex: "#D42922",
      textColor: "#FFFFFF",
      image: "/images/product/nexo-one-volt.webp",
    },
  ],

  features: [
    {
      id: "lightweight",
      title: "Lightweight Construction",
      description:
        "A streamlined upper and reduced-material architecture designed to keep the silhouette light without sacrificing structure.",
      value: "285G",
    },
    {
      id: "cushioning",
      title: "Responsive Cushioning",
      description:
        "A sculpted midsole concept designed to create a soft landing with a more energetic transition through each step.",
      value: "42MM",
    },
    {
      id: "traction",
      title: "Adaptive Traction",
      description:
        "Segmented outsole geometry designed to provide confident grip across everyday urban movement.",
      value: "360Â°",
    },
    {
      id: "comfort",
      title: "All-Day Comfort",
      description:
        "Soft interior lining, supportive geometry, and breathable construction designed for extended daily wear.",
      value: "24H",
    },
  ],

  materials: [
    {
      id: "engineered-mesh",
      name: "Engineered Mesh",
      description:
        "Breathable technical mesh designed to reduce weight while maintaining controlled structure around the foot.",
      position: "upper",
    },
    {
      id: "adaptive-lining",
      name: "Adaptive Lining",
      description:
        "A soft internal layer designed to improve comfort and create a more seamless fit.",
      position: "lining",
    },
    {
      id: "responsive-foam",
      name: "Responsive Foam",
      description:
        "Lightweight cushioning material forming the core of the sculpted midsole architecture.",
      position: "midsole",
    },
    {
      id: "traction-rubber",
      name: "High-Grip Rubber",
      description:
        "Durable rubber zones positioned across key contact areas for controlled everyday traction.",
      position: "outsole",
    },
  ],

  sizes: [
    { label: "US 7", value: 7, available: true },
    { label: "US 8", value: 8, available: true },
    { label: "US 9", value: 9, available: true },
    { label: "US 10", value: 10, available: true },
    { label: "US 11", value: 11, available: true },
    { label: "US 12", value: 12, available: false },
  ],
};

export const defaultColorway = nexoOne.colorways[0];

