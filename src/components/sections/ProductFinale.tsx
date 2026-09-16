"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useMemo, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { useProductExperience } from "@/components/layout/ProductExperienceProvider";
import { Button } from "@/components/ui/Button";
import { nexoOne } from "@/data/product";
import { getGsap } from "@/lib/animations/gsap";

export function ProductFinale() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  const { selectedColorwayId, selectedSize, setSelectedSize, addToCart } =
    useProductExperience();

  const selectedColorway = useMemo(
    () =>
      nexoOne.colorways.find(
        (colorway) => colorway.id === selectedColorwayId,
      ) ?? nexoOne.colorways[0],
    [selectedColorwayId],
  );

  useLayoutEffect(() => {
    if (!sectionRef.current || !introRef.current || !productRef.current) {
      return;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
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
        productRef.current,
        {
          opacity: 0,
          scale: 0.88,
          rotate: -8,
          y: 45,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: -3,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  const canAddToCart = selectedSize !== null;

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="relative overflow-hidden bg-[#f1f0eb] text-black"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[48%] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.035] blur-[130px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
      </div>

      <Container className="relative py-24 md:py-32">
        {/* Intro */}
        <div
          ref={introRef}
          className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"
        >
          <div>
            <div className="text-label text-black/35">NEXO ONE / 008</div>

            <h2 className="font-display mt-5 text-[clamp(4.5rem,9vw,9rem)] leading-[0.8] uppercase">
              Your move.
            </h2>
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <p className="text-[clamp(1.3rem,2vw,1.9rem)] leading-[1.2] tracking-[-0.035em] text-black/60">
              Choose your finish. Find your size. Step into the NEXO ONE
              performance system.
            </p>
          </div>
        </div>

        {/* Product + controls */}
        <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          {/* Product */}
          <div className="relative min-h-[30rem] md:min-h-[38rem]">
            <div ref={productRef} className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColorway.id}
                  initial={{
                    opacity: 0,
                    x: 35,
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: -35,
                    scale: 1.03,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={selectedColorway.image}
                    alt={`NEXO ONE ${selectedColorway.name}`}
                    fill
                    sizes="(max-width: 1024px) 95vw, 58vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              aria-hidden="true"
              className="absolute bottom-[13%] left-1/2 h-[9%] w-[48%] -translate-x-1/2 rounded-[50%] bg-black/10 blur-3xl"
            />
          </div>

          {/* Purchase controls */}
          <div>
            <div className="border-t border-black/15 pt-7">
              <div className="flex items-start justify-between gap-8">
                <div>
                  <div className="text-[0.62rem] tracking-[0.16em] text-black/35 uppercase">
                    Selected finish
                  </div>

                  <div className="mt-2 text-xl font-medium tracking-[-0.03em]">
                    {selectedColorway.name}
                  </div>
                </div>

                <div
                  className="h-6 w-6 rounded-full border border-black/15"
                  style={{
                    backgroundColor: selectedColorway.hex,
                  }}
                />
              </div>
            </div>

            {/* Size */}
            <div className="mt-8 border-t border-black/15 pt-7">
              <div className="flex items-center justify-between gap-6">
                <div className="text-[0.62rem] tracking-[0.16em] text-black/35 uppercase">
                  Select size
                </div>

                <div className="text-xs text-black/35">US sizing</div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {nexoOne.sizes.map((size) => {
                  const isSelected = selectedSize === size.value;

                  return (
                    <button
                      key={size.value}
                      type="button"
                      disabled={!size.available}
                      onClick={() => setSelectedSize(size.value)}
                      className={`relative flex h-14 items-center justify-center border text-sm transition-all duration-300 ${
                        isSelected
                          ? "border-black bg-black text-white"
                          : size.available
                            ? "border-black/15 text-black hover:border-black/40"
                            : "cursor-not-allowed border-black/8 text-black/20"
                      }`}
                    >
                      {size.label}

                      {!size.available ? (
                        <span className="absolute inset-x-2 top-1/2 h-px -rotate-[12deg] bg-black/15" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price */}
            <div className="mt-8 flex items-end justify-between gap-8 border-t border-black/15 pt-7">
              <div>
                <div className="text-[0.62rem] tracking-[0.16em] text-black/35 uppercase">
                  Demo price
                </div>

                <div className="font-display mt-2 text-5xl leading-none">
                  ${nexoOne.price}
                </div>
              </div>

              <div className="text-right text-[0.62rem] leading-5 tracking-[0.14em] text-black/30 uppercase">
                NEXO ONE
                <br />
                PERFORMANCE / 2026
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button
                onClick={addToCart}
                disabled={!canAddToCart}
                className="w-full py-4"
              >
                {canAddToCart ? "Add to Demo Cart" : "Select a Size"}
              </Button>

              <p className="mt-4 text-center text-xs leading-5 text-black/35">
                Demo experience only. No real payment or checkout will be
                processed.
              </p>
            </div>
          </div>
        </div>

        {/* Closing brand statement */}
        <div className="mt-24 border-t border-black/15 pt-14 md:mt-32 md:pt-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-label text-black/30">NEXO PERFORMANCE</div>

              <div className="font-display mt-4 text-[clamp(4rem,9vw,9rem)] leading-[0.78] uppercase">
                Built for
                <br />
                what&apos;s next.
              </div>
            </div>

            <div className="max-w-[16rem] text-sm leading-6 text-black/40 md:text-right">
              One silhouette. One performance system. Designed around continuous
              movement.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

