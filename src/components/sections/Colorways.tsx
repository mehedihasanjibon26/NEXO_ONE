"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";

import { Container } from "@/components/layout/Container";
import { useProductExperience } from "@/components/layout/ProductExperienceProvider";
import { nexoOne } from "@/data/product";

const colorwayMood: Record<string, string> = {
  "onyx-black": "#111111",
  "chalk-white": "#DDD9CF",
  "silver-mist": "#9B9DA0",
  "volt-red": "#9E1818",
};

export function Colorways() {
  const { selectedColorwayId, setSelectedColorwayId } = useProductExperience();

  const selectedColorway = useMemo(
    () =>
      nexoOne.colorways.find(
        (colorway) => colorway.id === selectedColorwayId,
      ) ?? nexoOne.colorways[0],
    [selectedColorwayId],
  );

  const activeIndex = nexoOne.colorways.findIndex(
    (colorway) => colorway.id === selectedColorway.id,
  );

  return (
    <section
      id="colorways"
      className="relative overflow-hidden bg-[#f1f0eb] py-24 text-black md:py-32"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="text-[0.6rem] tracking-[0.2em] text-black/35 uppercase">
              NEXO / COLORWAYS
            </div>

            <h2 className="font-display mt-4 text-[clamp(4rem,9vw,9rem)] leading-[0.82] uppercase">
              Choose your
              <br />
              expression.
            </h2>
          </div>

          <p className="max-w-[19rem] text-sm leading-6 text-black/45 md:text-right">
            Four distinct finishes built on the same NEXO ONE performance
            architecture.
          </p>
        </div>

        <motion.div
          animate={{
            backgroundColor: colorwayMood[selectedColorway.id] ?? "#111111",
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-14 overflow-hidden rounded-[2rem] text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute top-1/2 left-1/2 h-[32rem] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] blur-[120px]" />
          </div>

          <div className="relative min-h-[38rem] md:min-h-[46rem]">
            <div
              aria-hidden="true"
              className="font-display absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(10rem,28vw,28rem)] leading-none text-white/[0.05]"
            >
              ONE
            </div>

            <div className="absolute top-6 left-6 z-30 md:top-10 md:left-10">
              <div className="text-[0.55rem] tracking-[0.18em] text-white/40 uppercase">
                COLORWAY
              </div>

              <div className="font-display mt-2 text-4xl leading-none">
                0{activeIndex + 1}
              </div>
            </div>

            <div className="absolute top-6 right-6 z-30 text-right md:top-10 md:right-10">
              <div className="text-[0.55rem] tracking-[0.18em] text-white/40 uppercase">
                CURRENT
              </div>

              <div className="mt-2 text-sm tracking-[0.12em] uppercase">
                {selectedColorway.label}
              </div>
            </div>

            <div className="absolute inset-x-0 top-[7%] bottom-[24%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColorway.id}
                  initial={{
                    opacity: 0,
                    x: 45,
                    scale: 0.9,
                    rotate: 3,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -45,
                    scale: 1.04,
                    rotate: -3,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={selectedColorway.image}
                    alt={`NEXO ONE ${selectedColorway.name}`}
                    fill
                    sizes="(max-width: 768px) 95vw, 75vw"
                    className="object-contain p-4 md:p-8"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute inset-x-6 bottom-6 z-30 md:inset-x-10 md:bottom-10">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedColorway.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -15,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                  >
                    <div className="text-[0.55rem] tracking-[0.18em] text-white/40 uppercase">
                      NEXO ONE
                    </div>

                    <h3 className="font-display mt-2 text-[clamp(3rem,6vw,6rem)] leading-[0.82] uppercase">
                      {selectedColorway.name}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-wrap gap-3 md:justify-end">
                  {nexoOne.colorways.map((colorway) => {
                    const isActive = colorway.id === selectedColorway.id;

                    return (
                      <motion.button
                        key={colorway.id}
                        type="button"
                        onClick={() => setSelectedColorwayId(colorway.id)}
                        whileHover={{
                          x: 5,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        className={`flex items-center gap-3 rounded-full border px-4 py-3 text-[0.58rem] tracking-[0.14em] uppercase transition-colors ${
                          isActive
                            ? "border-white bg-white text-black"
                            : "border-white/20 text-white/65 hover:border-white/45"
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-black/10"
                          style={{
                            backgroundColor: colorway.hex,
                          }}
                        />

                        {colorway.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

