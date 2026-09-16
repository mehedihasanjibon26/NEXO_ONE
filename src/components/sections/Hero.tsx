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
    background: "#050505",
    foreground: "#F5F5F2",
    muted: "rgba(245,245,242,0.38)",
    line: "rgba(245,245,242,0.12)",
    glow: "rgba(255,255,255,0.06)",
  },
  {
    id: "chalk-white",
    number: "02",
    name: "CHALK WHITE",
    image: "/images/product/nexo-one-chalk.png",
    background: "#DCD8CE",
    foreground: "#111111",
    muted: "rgba(17,17,17,0.42)",
    line: "rgba(17,17,17,0.14)",
    glow: "rgba(255,255,255,0.28)",
  },
  {
    id: "silver-mist",
    number: "03",
    name: "SILVER MIST",
    image: "/images/product/nexo-one-silver.png",
    background: "#9EA0A3",
    foreground: "#101010",
    muted: "rgba(16,16,16,0.45)",
    line: "rgba(16,16,16,0.16)",
    glow: "rgba(255,255,255,0.18)",
  },
  {
    id: "volt-red",
    number: "04",
    name: "VOLT RED",
    image: "/images/product/nexo-one-volt.png",
    background: "#991C1C",
    foreground: "#F8F5F0",
    muted: "rgba(248,245,240,0.48)",
    line: "rgba(248,245,240,0.16)",
    glow: "rgba(255,90,70,0.16)",
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
  const shoeNameParts = activeShoe.name.split(" ");

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
          { yPercent: 0 },
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
          { opacity: 1 },
          {
            opacity: 0.48,
            ease: "none",
          },
          0,
        );
      }

      if (bottomMetaRef.current) {
        atmosphereTimeline.fromTo(
          bottomMetaRef.current,
          { opacity: 1 },
          {
            opacity: 0.55,
            ease: "none",
          },
          0,
        );
      }

      if (ctaRef.current) {
        atmosphereTimeline.fromTo(
          ctaRef.current,
          { opacity: 1 },
          {
            opacity: 0.84,
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
    <section ref={sectionRef} id="hero" className="relative h-[340vh]">
      <motion.div
        animate={{
          backgroundColor: activeShoe.background,
          color: activeShoe.foreground,
        }}
        transition={{
          duration: 1.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="sticky top-0 h-screen overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <motion.div
            animate={{
              backgroundColor: activeShoe.glow,
            }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute top-[45%] left-1/2 h-[40rem] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          />

          <motion.div
            animate={{
              background: `linear-gradient(to top, ${activeShoe.background}, transparent)`,
            }}
            transition={{
              duration: 1.35,
            }}
            className="absolute inset-x-0 bottom-0 h-48"
          />
        </div>

        <Container className="relative h-screen pt-28 md:pt-32">
          <div
            ref={topMetaRef}
            className="absolute inset-x-0 top-[14%] z-30 flex items-start justify-between"
          >
            <div
              className="text-[0.58rem] tracking-[0.18em] uppercase"
              style={{ color: activeShoe.muted }}
            >
              PERFORMANCE / 001
            </div>

            <p
              className="hidden max-w-[20rem] text-right text-sm leading-6 md:block"
              style={{ color: activeShoe.muted }}
            >
              A progressive sneaker concept engineered around movement,
              lightweight comfort, and sculpted performance.
            </p>
          </div>

          <div
            ref={headingRef}
            className="pointer-events-none absolute inset-x-0 top-[22%] z-10 text-center will-change-transform"
          >
            <div
              className="text-[0.72rem] font-medium tracking-[0.14em] uppercase"
              style={{ color: activeShoe.muted }}
            >
              NEXO ONE
            </div>

            <div className="relative mt-2 min-h-[11rem] md:min-h-[15rem]">
              <AnimatePresence initial={false} mode="sync">
                <motion.h1
                  key={activeShoe.id}
                  initial={{
                    opacity: 0,
                    y: direction > 0 ? 26 : -26,
                    scale: 0.985,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: direction > 0 ? -22 : 22,
                    scale: 1.01,
                    filter: "blur(6px)",
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display absolute inset-x-0 top-0 text-[clamp(5.5rem,14vw,14rem)] leading-[0.76] tracking-[-0.035em] uppercase"
                >
                  {shoeNameParts[0]}
                  <br />
                  {shoeNameParts.slice(1).join(" ")}
                </motion.h1>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute inset-0 z-20 flex items-center justify-center pt-[8vh]">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={activeShoe.id}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 90 : -90,
                  y: 16,
                  rotate: direction > 0 ? 3 : -3,
                  scale: activeScale * 0.94,
                  filter: "blur(6px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: activeScale,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -80 : 80,
                  y: -12,
                  rotate: direction > 0 ? -2.5 : 2.5,
                  scale: activeScale * 1.015,
                  filter: "blur(5px)",
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute aspect-[4/3] w-[86vw] max-w-[68rem] will-change-transform md:w-[68vw] lg:w-[58vw]"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -10, 0, 7, 0],
                          rotate: [0, -0.55, 0, 0.45, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 5.6,
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
                    className="object-contain drop-shadow-[0_35px_65px_rgba(0,0,0,0.16)]"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute bottom-[20%] left-0 z-30 min-h-12 min-w-48">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={activeShoe.id}
                initial={{
                  opacity: 0,
                  y: 10,
                  filter: "blur(3px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  filter: "blur(2px)",
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="text-[0.5rem] tracking-[0.18em] uppercase"
                  style={{ color: activeShoe.muted }}
                >
                  COLORWAY / {activeShoe.number}
                </div>

                <div className="mt-1 text-xs tracking-[0.14em] uppercase">
                  {activeShoe.name}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            ref={ctaRef}
            className="absolute bottom-[14%] left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap"
          >
            <Button href="#colorways">Discover NEXO ONE</Button>

            <Button
              href="#technology"
              variant="secondary"
              className={
                activeIndex === 1 || activeIndex === 2
                  ? "hidden border-black/25 !text-black hover:border-black/60 hover:bg-black/5 sm:inline-flex"
                  : "hidden sm:inline-flex"
              }
            >
              Explore Technology
            </Button>
          </div>

          <div
            ref={bottomMetaRef}
            className="absolute inset-x-0 bottom-[4%] z-30 flex items-center justify-between border-t pt-5"
            style={{ borderColor: activeShoe.line }}
          >
            <div
              className="text-[0.55rem] tracking-[0.18em] uppercase"
              style={{ color: activeShoe.muted }}
            >
              NEXO / 2026
            </div>

            <div
              className="flex items-center gap-3 text-[0.55rem] tracking-[0.18em] uppercase"
              style={{ color: activeShoe.muted }}
            >
              Scroll to explore
              <span className="text-base">↓</span>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 z-40 grid grid-cols-4 gap-1">
            {heroShoes.map((shoe, index) => (
              <div
                key={shoe.id}
                className="h-px overflow-hidden"
                style={{
                  backgroundColor: activeShoe.line,
                }}
              >
                <motion.div
                  animate={{
                    scaleX: index <= activeIndex ? 1 : 0,
                    opacity: index <= activeIndex ? 1 : 0.22,
                    backgroundColor: activeShoe.foreground,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full origin-left"
                />
              </div>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
