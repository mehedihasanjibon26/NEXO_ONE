"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { nexoOne } from "@/data/product";
import { getGsap } from "@/lib/animations/gsap";

const layers = [
  {
    id: "upper",
    clipPath: "inset(0% 0% 52% 0%)",
    y: -105,
  },
  {
    id: "lining",
    clipPath: "inset(34% 0% 43% 0%)",
    y: -38,
  },
  {
    id: "midsole",
    clipPath: "inset(55% 0% 20% 0%)",
    y: 42,
  },
  {
    id: "outsole",
    clipPath: "inset(73% 0% 0% 0%)",
    y: 112,
  },
] as const;

const callouts = [
  {
    number: "01",
    eyebrow: "UPPER",
    className: "left-4 top-[25%] md:left-[4%] md:top-[27%] lg:left-[7%]",
    enterX: -60,
    enterY: 0,
    align: "left",
  },
  {
    number: "02",
    eyebrow: "LINING",
    className: "right-4 top-[25%] md:right-[4%] md:top-[27%] lg:right-[7%]",
    enterX: 60,
    enterY: 0,
    align: "right",
  },
  {
    number: "03",
    eyebrow: "MIDSOLE",
    className: "left-4 bottom-[17%] md:left-[4%] md:bottom-[18%] lg:left-[7%]",
    enterX: -60,
    enterY: 20,
    align: "left",
  },
  {
    number: "04",
    eyebrow: "OUTSOLE",
    className:
      "right-4 bottom-[17%] md:right-[4%] md:bottom-[18%] lg:right-[7%]",
    enterX: 60,
    enterY: 20,
    align: "right",
  },
] as const;

export function MaterialsExploded() {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const calloutRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !curtainRef.current ||
      !shoeRef.current ||
      !headingRef.current
    ) {
      return;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      const validLayers = layerRefs.current.filter(Boolean);
      const validCallouts = calloutRefs.current.filter(Boolean);

      gsap.set(curtainRef.current, {
        scaleY: 1,
        transformOrigin: "top center",
      });

      gsap.set(shoeRef.current, {
        scale: 0.94,
        opacity: 0.35,
      });

      gsap.set(validLayers, {
        y: 0,
      });

      gsap.set(validCallouts, {
        opacity: 0,
        scale: 0.94,
      });

      callouts.forEach((callout, index) => {
        gsap.set(calloutRefs.current[index], {
          x: callout.enterX,
          y: callout.enterY,
        });
      });

      const entranceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      entranceTimeline
        .to(
          curtainRef.current,
          {
            scaleY: 0,
            ease: "none",
          },
          0,
        )
        .to(
          shoeRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: "none",
          },
          0.18,
        );

      const deconstructTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      deconstructTimeline
        .to(
          headingRef.current,
          {
            opacity: 0.18,
            y: -35,
            ease: "none",
          },
          0.08,
        )
        .to(
          shoeRef.current,
          {
            scale: 1.06,
            ease: "none",
          },
          0.12,
        );

      layers.forEach((layer, index) => {
        deconstructTimeline.to(
          layerRefs.current[index],
          {
            y: layer.y,
            ease: "none",
          },
          0.25,
        );
      });

      callouts.forEach((callout, index) => {
        deconstructTimeline.to(
          calloutRefs.current[index],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            ease: "none",
          },
          0.62 + index * 0.035,
        );
      });
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="materials"
      className="relative h-[220vh] bg-[#f1f0eb] text-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Black transition curtain */}
        <div
          ref={curtainRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-50 bg-black will-change-transform"
        />

        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.035] blur-[120px]" />

          <div className="absolute inset-x-0 top-0 h-px bg-black/10" />

          <div className="absolute inset-x-0 bottom-0 h-px bg-black/10" />
        </div>

        <Container className="relative h-full">
          {/* Heading */}
          <div
            ref={headingRef}
            className="absolute inset-x-0 top-20 z-20 flex items-start justify-between md:top-24"
          >
            <div>
              <div className="text-label text-black/35">MATERIALS / 004</div>

              <h2 className="font-display mt-4 text-[clamp(3.6rem,7vw,7rem)] leading-[0.82] uppercase">
                Built layer
                <br />
                by layer.
              </h2>
            </div>

            <div className="hidden max-w-[17rem] text-right text-sm leading-6 text-black/40 md:block">
              Scroll to separate the construction of NEXO ONE and reveal the
              technology behind each layer.
            </div>
          </div>

          {/* Center sneaker */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={shoeRef}
              className="relative aspect-[4/3] w-[88vw] max-w-[58rem] will-change-transform md:w-[68vw] lg:w-[55vw]"
            >
              <div
                aria-hidden="true"
                className="absolute top-[77%] left-1/2 h-[12%] w-[52%] -translate-x-1/2 rounded-[50%] bg-black/10 blur-3xl"
              />

              {/* Faint assembled silhouette */}
              <div className="absolute inset-0 opacity-[0.055]">
                <Image
                  src="/images/product/nexo-one-hero.png"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 900px"
                  className="object-contain"
                />
              </div>

              {/* Split layers */}
              {layers.map((layer, index) => (
                <div
                  key={layer.id}
                  ref={(element) => {
                    layerRefs.current[index] = element;
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={{
                    clipPath: layer.clipPath,
                  }}
                >
                  <Image
                    src="/images/product/nexo-one-hero.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 900px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Feature callouts */}
          {callouts.map((callout, index) => {
            const material = nexoOne.materials[index];

            return (
              <div
                key={callout.number}
                ref={(element) => {
                  calloutRefs.current[index] = element;
                }}
                className={`absolute z-30 w-[11rem] will-change-transform md:w-[14rem] lg:w-[16rem] ${callout.className}`}
              >
                <div
                  className={`flex flex-col ${
                    callout.align === "right"
                      ? "items-end text-right"
                      : "items-start text-left"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {callout.align === "right" ? (
                      <span className="h-px w-8 bg-black/25 md:w-14" />
                    ) : null}

                    <span className="font-display text-3xl leading-none text-black/15">
                      {callout.number}
                    </span>

                    {callout.align === "left" ? (
                      <span className="h-px w-8 bg-black/25 md:w-14" />
                    ) : null}
                  </div>

                  <div className="mt-3 text-[0.62rem] tracking-[0.16em] text-black/35 uppercase">
                    {callout.eyebrow}
                  </div>

                  <h3 className="mt-2 text-sm font-semibold tracking-[-0.02em] md:text-base">
                    {material?.name}
                  </h3>

                  <p className="mt-2 hidden max-w-[15rem] text-xs leading-5 text-black/45 md:block">
                    {material?.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
            <div className="text-[0.6rem] tracking-[0.18em] text-black/30 uppercase">
              Scroll to deconstruct
            </div>

            <div
              aria-hidden="true"
              className="mx-auto mt-3 h-8 w-px bg-gradient-to-b from-black/35 to-transparent"
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
