import Lenis from "lenis";

export function createLenis() {
  return new Lenis({
    autoRaf: false,
    anchors: true,
    lerp: 0.1,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
  });
}
