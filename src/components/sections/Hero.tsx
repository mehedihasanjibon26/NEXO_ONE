"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { siteConfig } from "@/data/site";
import { getGsap } from "@/lib/animations/gsap";
import { fadeUp, staggerContainer } from "@/lib/animations/motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const topMetaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          topMetaRef.current,
          {
            opacity: 0,
            y: -20,
            ease: "none",
          },
          0,
        )
        .to(
          headingRef.current,
          {
            yPercent: -10,
            scale: 0.97,
            opacity: 0.16,
            ease: "none",
          },
          0,
        )
        .to(
          productRef.current,
          {
            yPercent: 18,
            scale: 1.1,
            rotate: 4,
            ease: "none",
          },
          0,
        )
        .to(
          ctaRef.current,
          {
            opacity: 0,
            y: 18,
            ease: "none",
          },
          0.22,
        )
        .to(
          bottomMetaRef.current,
          {
            opacity: 0,
            y: 10,
            ease: "none",
          },
          0.28,
        );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative h-[138vh] bg-black text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute top-[43%] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-[130px] md:h-[46rem] md:w-[46rem]" />

          <div className="absolute top-[62%] left-1/2 h-[14rem] w-[50%] -translate-x-1/2 rounded-[50%] bg-white/[0.04] blur-[85px]" />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <Container className="relative flex h-screen flex-col pt-28 md:pt-32">
          <motion.div
            ref={topMetaRef}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex shrink-0 items-start justify-between gap-8"
          >
            <motion.div variants={fadeUp} className="text-label text-white/40">
              PERFORMANCE / 001
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-small hidden max-w-[17rem] text-right text-white/45 md:block"
            >
              A progressive sneaker concept engineered around movement,
              lightweight comfort, and sculpted performance.
            </motion.p>
          </motion.div>

          <div className="relative min-h-0 flex-1">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="absolute inset-x-0 top-[6%] z-10 flex flex-col items-center text-center md:top-[4%]"
            >
              <motion.p
                variants={fadeUp}
                className="text-label mb-3 text-white/50"
              >
                {siteConfig.brand.product}
              </motion.p>

              <motion.h1
                ref={headingRef}
                variants={fadeUp}
                className="text-display-xl pointer-events-none relative z-20 text-center will-change-transform"
              >
                Built for
                <br />
                Motion
              </motion.h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="absolute inset-x-0 top-[37%] z-30 flex justify-center md:top-[34%]"
            >
              <div
                ref={productRef}
                className="w-full max-w-[56rem] will-change-transform md:max-w-[62rem] lg:max-w-[66rem]"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 5.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="w-full"
                >
                  <ProductVisual
                    src="/images/product/nexo-one-hero.png"
                    alt="NEXO ONE futuristic premium sneaker"
                    priority
                    className="scale-[1.02] md:scale-[1.08] lg:scale-[1.1]"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              ref={ctaRef}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="absolute inset-x-0 bottom-5 z-40 flex flex-col items-center gap-4 md:bottom-6"
            >
              <p className="max-w-md px-6 text-center text-sm leading-relaxed text-white/45 md:hidden">
                A progressive sneaker engineered around movement, lightweight
                comfort, and sculpted performance.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Button href="#design">Discover NEXO ONE</Button>

                <Button href="#technology" variant="secondary">
                  Explore Technology
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            ref={bottomMetaRef}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex shrink-0 items-end justify-between border-t border-white/10 py-5"
          >
            <motion.div
              variants={fadeUp}
              className="text-small tracking-[0.12em] text-white/35 uppercase"
            >
              NEXO / 2026
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="text-small flex items-center gap-3 tracking-[0.12em] text-white/35 uppercase"
            >
              <span>Scroll to explore</span>

              <motion.span
                aria-hidden="true"
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="text-base text-white/60"
              >
                ↓
              </motion.span>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
