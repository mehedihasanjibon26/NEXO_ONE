"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useMemo, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { useProductExperience } from "@/components/layout/ProductExperienceProvider";
import { nexoOne } from "@/data/product";
import { getGsap } from "@/lib/animations/gsap";

const colorwayMood: Record<string, string> = {
  "onyx-black": "#111111",
  "chalk-white": "#DDD9CF",
  "silver-mist": "#9B9DA0",
  "volt-red": "#9E1818",
};

export function Colorways() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const { selectedColorwayId, setSelectedColorwayId } = useProductExperience();

  const selectedColorway = useMemo(
    () =>
      nexoOne.colorways.find(
        (colorway) => colorway.id === selectedColorwayId,
      ) ?? nexoOne.colorways[0],
    [selectedColorwayId],
  );

  const stageColor = colorwayMood[selectedColorway.id] ?? selectedColorway.hex;

  useLayoutEffect(() => {
    if (!sectionRef.current || !headingRef.current || !stageRef.current) {
      return;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 55,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            end: "top 40%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        stageRef.current,
        {
          opacity: 0.25,
          y: 45,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 88%",
            end: "top 48%",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="colorways"
      className="relative overflow-hidden bg-[#f1f0eb] text-black"
    >
      {/* Ambient background */}
      <motion.div
        aria-hidden="true"
        animate={{
          backgroundColor: `${stageColor}18`,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute inset-0"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[52%] left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-[150px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
      </div>

      <Container className="relative py-24 md:py-32">
        {/* Intro */}
        <div
          ref={headingRef}
          className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
        >
          <div>
            <div className="text-label text-black/35">COLORWAYS / 006</div>

            <h2 className="font-display mt-5 text-[clamp(4rem,8vw,8rem)] leading-[0.82] uppercase">
              Choose
              <br />
              your motion.
            </h2>
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <p className="text-[clamp(1.3rem,2vw,1.9rem)] leading-[1.2] tracking-[-0.035em] text-black/60">
              One silhouette. Four distinct moods. Each finish reshapes the
              character of NEXO ONE without changing its performance DNA.
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          {/* Animated product stage */}
          <motion.div
            ref={stageRef}
            animate={{
              backgroundColor: stageColor,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[30rem] overflow-hidden rounded-[2rem] md:min-h-[39rem]"
          >
            {/* Giant background typography */}
            <div
              aria-hidden="true"
              className="font-display pointer-events-none absolute inset-x-0 top-8 text-center text-[clamp(7rem,18vw,18rem)] leading-none text-white/[0.055]"
            >
              ONE
            </div>

            {/* Stage label */}
            <div className="absolute top-6 left-6 z-20 md:top-8 md:left-8">
              <div className="text-[0.62rem] tracking-[0.16em] text-white/45 uppercase">
                NEXO ONE
              </div>

              <div className="mt-2 text-sm font-medium text-white/80">
                {selectedColorway.name}
              </div>
            </div>

            {/* Index */}
            <div className="font-display absolute top-6 right-6 z-20 text-4xl leading-none text-white/15 md:top-8 md:right-8">
              0
              {nexoOne.colorways.findIndex(
                (colorway) => colorway.id === selectedColorway.id,
              ) + 1}
            </div>

            {/* Shoe transition */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColorway.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: 45,
                    rotate: 2,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.04,
                    x: -45,
                    rotate: -2,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={selectedColorway.image}
                    alt={`NEXO ONE ${selectedColorway.name}`}
                    fill
                    sizes="(max-width: 1024px) 95vw, 65vw"
                    className="object-contain p-4 md:p-8"
                    priority={selectedColorway.id === "onyx-black"}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Ground */}
            <div
              aria-hidden="true"
              className="absolute bottom-[14%] left-1/2 h-[8%] w-[46%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-3xl"
            />

            {/* Bottom metadata */}
            <div className="absolute inset-x-6 bottom-6 z-20 flex items-end justify-between border-t border-white/15 pt-5 md:inset-x-8 md:bottom-8">
              <div>
                <div className="text-[0.58rem] tracking-[0.16em] text-white/40 uppercase">
                  Selected finish
                </div>

                <div className="font-display mt-1 text-3xl leading-none text-white uppercase">
                  {selectedColorway.label}
                </div>
              </div>

              <div className="text-right text-[0.58rem] leading-5 tracking-[0.14em] text-white/35 uppercase">
                Performance
                <br />
                Series / 2026
              </div>
            </div>
          </motion.div>

          {/* Selector */}
          <div>
            <div className="text-[0.62rem] tracking-[0.16em] text-black/35 uppercase">
              Select a finish
            </div>

            <div className="mt-6 border-t border-black/15">
              {nexoOne.colorways.map((colorway, index) => {
                const isActive = colorway.id === selectedColorway.id;

                return (
                  <motion.button
                    key={colorway.id}
                    type="button"
                    onClick={() => setSelectedColorwayId(colorway.id)}
                    whileHover={{
                      x: 5,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex w-full items-center justify-between gap-6 border-b border-black/15 py-6 text-left"
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-display text-3xl leading-none transition-colors duration-300 ${
                          isActive ? "text-black" : "text-black/15"
                        }`}
                      >
                        0{index + 1}
                      </span>

                      <div>
                        <div
                          className={`text-lg font-medium tracking-[-0.03em] transition-colors duration-300 ${
                            isActive ? "text-black" : "text-black/50"
                          }`}
                        >
                          {colorway.name}
                        </div>

                        <div className="mt-1 text-[0.62rem] tracking-[0.16em] text-black/30 uppercase">
                          {colorway.label}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        scale: isActive ? 1.3 : 1,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative flex h-7 w-7 items-center justify-center rounded-full border border-black/15"
                    >
                      <span
                        className="h-4 w-4 rounded-full"
                        style={{
                          backgroundColor: colorway.hex,
                        }}
                      />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* Selected summary */}
            <div className="mt-10 border-t border-black/15 pt-8">
              <div className="text-[0.62rem] tracking-[0.16em] text-black/35 uppercase">
                Current selection
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColorway.id}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-4"
                >
                  <div className="font-display text-[clamp(3.5rem,6vw,6rem)] leading-[0.8] uppercase">
                    {selectedColorway.label}
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: selectedColorway.hex,
                      }}
                    />

                    <span className="text-xs tracking-[0.14em] text-black/40 uppercase">
                      {selectedColorway.name}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
