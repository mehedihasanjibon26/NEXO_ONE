"use client";

import { useEffect, type ReactNode } from "react";

import { getGsap } from "@/lib/animations/gsap";
import { createLenis } from "@/lib/animations/lenis";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = createLenis();
    const { gsap, ScrollTrigger } = getGsap();

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", updateScrollTrigger);

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

