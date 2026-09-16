"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { useProductExperience } from "@/components/layout/ProductExperienceProvider";
import { Button } from "@/components/ui/Button";
import { getGsap } from "@/lib/animations/gsap";

const heroShoes = [
  {
    id: "onyx-black",
    number: "01",
    name: "ONYX BLACK",
    image: "/images/product/nexo-one-hero.png",
  },
  {
    id: "chalk-white",
    number: "02",
    name: "CHALK WHITE",
    image: "/images/product/nexo-one-chalk.png",
  },
  {
    id: "silver-mist",
    number: "03",
    name: "SILVER MIST",
    image: "/images/product/nexo-one-silver.png",
  },
  {
    id: "volt-red",
    number: "04",
    name: "VOLT RED",
    image: "/images/product/nexo-one-volt.png",
  },
];

const getShoeScale = (index: number) => {
  return index === 0 ? 0.82 : 1;
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const topMetaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);

  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const shouldReduceMotion = useReducedMotion();

  const { setSelectedColorwayId } = useProductExperience();

  const activeShoe = heroShoes[activeIndex];
  const activeScale = getShoeScale(activeIndex);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const { gsap, ScrollTrigger } = getGsap();

    const context = gsap.context(() => {
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",

        onUpdate: (self) => {
          let nextIndex = 0;

          if (self.progress >= 0.76) {
            nextIndex = 3;
          } else if (self.progress >= 0.51) {
            nextIndex = 2;
          } else if (self.progress >= 0.26) {
            nextIndex = 1;
          }

          const previousIndex = activeIndexRef.current;

          if (nextIndex !== previousIndex) {
            setDirection(nextIndex > previousIndex ? 1 : -1);

            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);

            const nextShoe = heroShoes[nextIndex];

            if (nextShoe) {
              setSelectedColorwayId(nextShoe.id);
            }
          }
        },
      });

      const atmosphereTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (headingRef.current) {
        atmosphereTimeline.fromTo(
          headingRef.current,
          {
            yPercent: 0,
          },
          {
            yPercent: -8,
            ease: "none",
          },
          0,
        );
      }

      if (topMetaRef.current) {
        atmosphereTimeline.fromTo(
          topMetaRef.current,
          {
            opacity: 1,
          },
          {
            opacity: 0.45,
            ease: "none",
          },
          0,
        );
      }

      if (bottomMetaRef.current) {
        atmosphereTimeline.fromTo(
          bottomMetaRef.current,
          {
            opacity: 1,
          },
          {
            opacity: 0.5,
            ease: "none",
          },
          0,
        );
      }

      if (ctaRef.current) {
        atmosphereTimeline.fromTo(
          ctaRef.current,
          {
            opacity: 1,
          },
          {
            opacity: 0.82,
            ease: "none",
          },
          0,
        );
      }

      return () => {
        scrollTrigger.kill();
      };
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, [setSelectedColorwayId]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[340vh] bg-black text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute top-[45%] left-1/2 h-[40rem] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.045] blur-[150px]" />

          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <Container className="relative h-screen pt-28 md:pt-32">
          {/* Top meta */}
          <div
            ref={topMetaRef}
            className="absolute inset-x-0 top-[14%] z-30 flex items-start justify-between"
          >
            <div className="text-[0.58rem] tracking-[0.18em] text-white/35 uppercase">
              PERFORMANCE / 001
            </div>

            <p className="hidden max-w-[20rem] text-right text-sm leading-6 text-white/35 md:block">
              A progressive sneaker concept engineered around movement,
              lightweight comfort, and sculpted performance.
            </p>
          </div>

          {/* Hero heading */}
          <div
            ref={headingRef}
            className="pointer-events-none absolute inset-x-0 top-[22%] z-10 text-center will-change-transform"
          >
            <div className="text-[0.72rem] font-medium tracking-[0.14em] text-white/35 uppercase">
              NEXO ONE
            </div>

            <h1 className="font-display mt-2 text-[clamp(5.5rem,14vw,14rem)] leading-[0.76] tracking-[-0.035em] uppercase">
              BUILT FOR
              <br />
              MOTION
            </h1>
          </div>

          {/* Single active shoe stage */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pt-[8vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShoe.id}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 180 : -180,
                  y: 30,
                  rotate: direction > 0 ? 7 : -7,
                  scale: activeScale * 0.9,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: activeScale,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -180 : 180,
                  y: -20,
                  rotate: direction > 0 ? -7 : 7,
                  scale: activeScale * 1.06,
                }}
                transition={{
                  duration: 0.62,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute aspect-[4/3] w-[86vw] max-w-[68rem] will-change-transform md:w-[68vw] lg:w-[58vw]"
              >
                {/* Floating layer */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -12, 0, 8, 0],
                          rotate: [0, -0.8, 0, 0.6, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 5.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className="relative h-full w-full will-change-transform"
                >
                  <Image
                    src={activeShoe.image}
                    alt={`NEXO ONE ${activeShoe.name}`}
                    fill
                    priority={activeIndex === 0}
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 72vw, 1050px"
                    className="object-contain drop-shadow-[0_35px_65px_rgba(255,255,255,0.05)]"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Current colorway */}
          <div className="pointer-events-none absolute bottom-[20%] left-0 z-30 min-h-12 min-w-48">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShoe.id}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="text-[0.5rem] tracking-[0.18em] text-white/30 uppercase">
                  COLORWAY / {activeShoe.number}
                </div>

                <div className="mt-1 text-xs tracking-[0.14em] text-white/55 uppercase">
                  {activeShoe.name}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="absolute bottom-[14%] left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap"
          >
            <Button href="#colorways">Discover NEXO ONE</Button>

            <Button
              href="#technology"
              variant="secondary"
              className="hidden sm:inline-flex"
            >
              Explore Technology
            </Button>
          </div>

          {/* Bottom meta */}
          <div
            ref={bottomMetaRef}
            className="absolute inset-x-0 bottom-[4%] z-30 flex items-center justify-between border-t border-white/10 pt-5"
          >
            <div className="text-[0.55rem] tracking-[0.18em] text-white/25 uppercase">
              NEXO / 2026
            </div>

            <div className="flex items-center gap-3 text-[0.55rem] tracking-[0.18em] text-white/25 uppercase">
              Scroll to explore
              <span className="text-base">↓</span>
            </div>
          </div>

          {/* Colorway progress */}
          <div className="absolute right-0 bottom-0 left-0 z-40 grid grid-cols-4 gap-1">
            {heroShoes.map((shoe, index) => (
              <div key={shoe.id} className="h-px overflow-hidden bg-white/10">
                <motion.div
                  animate={{
                    scaleX: index <= activeIndex ? 1 : 0,
                    opacity: index <= activeIndex ? 1 : 0.25,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full origin-left bg-white"
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
