"use client";

import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { getGsap } from "@/lib/animations/gsap";

const footerNavigation = [
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
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!footerRef.current || !brandRef.current || !contentRef.current) {
      return;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      gsap.fromTo(
        brandRef.current,
        {
          opacity: 0.12,
          yPercent: 20,
          scale: 0.96,
        },
        {
          opacity: 1,
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "top 35%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 65%",
            end: "top 30%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        },
      );
    }, footerRef);

    return () => {
      context.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.035] to-transparent"
      />

      <Container className="relative pt-20 pb-8 md:pt-28 md:pb-10">
        <div
          ref={contentRef}
          className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-2 md:items-end md:pb-20"
        >
          <div>
            <div className="text-[0.62rem] tracking-[0.2em] text-white/30 uppercase">
              NEXO / PERFORMANCE SYSTEM
            </div>

            <p className="mt-6 max-w-[27rem] text-[clamp(1.4rem,2.3vw,2.15rem)] leading-[1.08] tracking-[-0.04em] text-white/70">
              One silhouette engineered around movement, comfort, and the next
              step forward.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-20 md:justify-self-end">
            <div>
              <div className="text-[0.58rem] tracking-[0.18em] text-white/25 uppercase">
                Explore
              </div>

              <nav className="mt-5 flex flex-col items-start gap-3">
                {footerNavigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <div className="text-[0.58rem] tracking-[0.18em] text-white/25 uppercase">
                Product
              </div>

              <div className="mt-5 flex flex-col items-start gap-3">
                <a
                  href="#colorways"
                  className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
                >
                  Colorways
                </a>

                <a
                  href="#motion"
                  className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
                >
                  Motion
                </a>

                <a
                  href="#finale"
                  className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
                >
                  NEXO ONE
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={brandRef}
          className="relative overflow-hidden border-b border-white/10 py-10 md:py-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 h-[20rem] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[100px]"
          />

          <div className="font-display relative text-[clamp(8rem,25vw,25rem)] leading-[0.72] tracking-[-0.045em]">
            NEXO
          </div>

          <div className="relative mt-5 flex items-center justify-between gap-6">
            <span className="text-[0.58rem] tracking-[0.22em] text-white/25 uppercase">
              Built for motion.
            </span>

            <span className="text-[0.58rem] tracking-[0.22em] text-white/25 uppercase">
              NEXO ONE / 2026
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-[0.6rem] tracking-[0.16em] text-white/25 uppercase sm:flex-row sm:items-center sm:justify-between">
          <div>Â© 2026 NEXO. Concept product experience.</div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex w-fit items-center gap-3 text-white/45 transition-colors duration-300 hover:text-white"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-transform duration-300 group-hover:-translate-y-1">
              â†‘
            </span>
          </button>
        </div>
      </Container>
    </footer>
  );
}

