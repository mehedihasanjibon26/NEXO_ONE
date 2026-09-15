/** Shared media queries; breakpoints follow PRD section 9. */
export const motionQueries = {
  reduced: "(prefers-reduced-motion: reduce)",
  mobile: "(width < 768px)",
  tablet: "(768px <= width < 1280px)",
  desktop: "(width >= 1280px)",
} as const;

/** GSAP and Motion durations use seconds; Lenis.raf uses milliseconds. */
export function secondsToMilliseconds(seconds: number): number {
  return seconds * 1000;
}
