"use client";

import Lenis from "lenis";

import {
  gsap,
  registerGsapPlugins,
  ScrollTrigger,
} from "@/lib/animations/gsap";
import { motionQueries, secondsToMilliseconds } from "@/lib/animations/motion";

/**
 * Initialize once from a future root client effect and return its cleanup.
 * This helper is intentionally not mounted during project setup.
 */
export function initializeSmoothScroll(): () => void {
  if (typeof window === "undefined") return () => {};

  registerGsapPlugins();

  const preference = window.matchMedia(motionQueries.reduced);
  let lenis: Lenis | null = null;

  const tick = (time: number) => {
    lenis?.raf(secondsToMilliseconds(time));
  };

  const stop = () => {
    gsap.ticker.remove(tick);
    lenis?.off("scroll", ScrollTrigger.update);
    lenis?.destroy();
    lenis = null;
  };

  const syncPreference = () => {
    stop();

    if (preference.matches) return;

    lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      syncTouch: false,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
  };

  syncPreference();
  preference.addEventListener("change", syncPreference);

  return () => {
    preference.removeEventListener("change", syncPreference);
    stop();
  };
}
