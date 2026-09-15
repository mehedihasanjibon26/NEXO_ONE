import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Colorways } from "@/components/sections/Colorways";
import { DesignStory } from "@/components/sections/DesignStory";
import { Hero } from "@/components/sections/Hero";
import { MaterialsExploded } from "@/components/sections/MaterialsExploded";
import { MotionStory } from "@/components/sections/MotionStory";
import { Performance } from "@/components/sections/Performance";
import { ProductFinale } from "@/components/sections/ProductFinale";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { DemoCartDrawer } from "@/components/ui/DemoCartDrawer";

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      <Hero />
      <DesignStory />
      <ProductShowcase />
      <MaterialsExploded />
      <Performance />
      <Colorways />
      <MotionStory />
      <ProductFinale />

      <Footer />

      <DemoCartDrawer />
    </main>
  );
}
