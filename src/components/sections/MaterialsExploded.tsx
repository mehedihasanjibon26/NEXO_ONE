"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { nexoOne } from "@/data/product";
import { getGsap } from "@/lib/animations/gsap";

/*
 * 4 equal non-overlapping slices
 * final vertical spacing remains equal:
 * -21, -7, +7, +21  => 14px equal gaps
 *
 * To make the split movement prettier,
 * each layer now also has:
 * - a tiny horizontal drift
 * - a tiny scale settle
 * - a small stagger in timing
 */
const layers = [
  {
    id: "upper",
    clipPath: "inset(0% 0% 75% 0%)",
    offsetY: -21,
    offsetX: -8,
    scale: 1.01,
  },
  {
    id: "lining",
    clipPath: "inset(25% 0% 50% 0%)",
    offsetY: -7,
    offsetX: 6,
    scale: 1.006,
  },
  {
    id: "midsole",
    clipPath: "inset(50% 0% 25% 0%)",
    offsetY: 7,
    offsetX: -6,
    scale: 1.006,
  },
  {
    id: "outsole",
    clipPath: "inset(75% 0% 0% 0%)",
    offsetY: 21,
    offsetX: 8,
    scale: 1.01,
  },
];

export function MaterialsExploded() {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const fullShoeRef = useRef<HTMLDivElement>(null);

  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const calloutRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !curtainRef.current ||
      !introRef.current ||
      !fullShoeRef.current
    ) {
      return;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      const validLayers = layerRefs.current.filter(
        (item): item is HTMLDivElement => Boolean(item),
      );

      const validCallouts = calloutRefs.current.filter(
        (item): item is HTMLDivElement => Boolean(item),
      );

      gsap.set(validLayers, {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      gsap.set(validCallouts, {
        opacity: 0,
        y: 16,
      });

      const entranceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 25%",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      entranceTimeline
        .fromTo(
          curtainRef.current,
          {
            scaleY: 1,
            transformOrigin: "top",
          },
          {
            scaleY: 0,
            ease: "none",
          },
          0,
        )
        .fromTo(
          introRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            ease: "none",
          },
          0.15,
        )
        .fromTo(
          fullShoeRef.current,
          {
            opacity: 0.35,
            scale: 0.96,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
          },
          0.12,
        );

      const splitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // small hold on intact shoe
      splitTimeline.to(
        fullShoeRef.current,
        {
          scale: 1.01,
          ease: "none",
          duration: 0.34,
        },
        0,
      );

      // sliced copy becomes visible while aligned
      splitTimeline.to(
        validLayers,
        {
          opacity: 1,
          ease: "none",
          duration: 0.14,
        },
        0.34,
      );

      // intact shoe fades out gently
      splitTimeline.to(
        fullShoeRef.current,
        {
          opacity: 0,
          scale: 1.015,
          filter: "blur(3px)",
          ease: "none",
          duration: 0.24,
        },
        0.38,
      );

      // prettier split: small stagger + tiny x drift + micro scale settle
      layers.forEach((layer, index) => {
        const element = layerRefs.current[index];

        if (!element) return;

        splitTimeline.to(
          element,
          {
            x: layer.offsetX,
            y: layer.offsetY,
            scale: layer.scale,
            filter: "blur(0px)",
            ease: "none",
            duration: 0.34,
          },
          0.44 + index * 0.035,
        );

        splitTimeline.to(
          element,
          {
            x: layer.offsetX * 0.92,
            y: layer.offsetY,
            scale: 1,
            ease: "none",
            duration: 0.26,
          },
          0.8 + index * 0.02,
        );
      });

      // callouts appear after split settles
      validCallouts.forEach((callout, index) => {
        splitTimeline.to(
          callout,
          {
            opacity: 1,
            y: 0,
            ease: "none",
            duration: 0.2,
          },
          0.88 + index * 0.025,
        );
      });
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  const materials = nexoOne.materials;

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="relative h-[205vh] bg-[#f1f0eb] text-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={curtainRef}
          className="pointer-events-none absolute inset-0 z-50 bg-black"
        />

        <Container className="relative h-full">
          <div
            ref={introRef}
            className="absolute inset-x-0 top-[8%] z-30 flex items-start justify-between"
          >
            <div>
              <div className="text-[0.58rem] tracking-[0.2em] text-black/35 uppercase">
                MATERIAL SYSTEM / 004
              </div>

              <h2 className="font-display mt-4 text-[clamp(3.8rem,7vw,7.5rem)] leading-[0.82] uppercase">
                Built layer
                <br />
                by layer.
              </h2>
            </div>

            <p className="hidden max-w-[17rem] text-right text-sm leading-6 text-black/40 md:block">
              Scroll through the construction of NEXO ONE and reveal the
              technology behind each layer.
            </p>
          </div>

          <div className="absolute inset-0 z-20 flex items-center justify-center pt-[6vh]">
            <div className="relative aspect-[4/3] w-[76vw] max-w-[52rem] md:w-[58vw] lg:w-[46vw]">
              <div
                ref={fullShoeRef}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="/images/product/nexo-one-hero.webp"
                  alt="NEXO ONE material construction"
                  fill
                  sizes="(max-width: 768px) 76vw, (max-width: 1200px) 58vw, 820px"
                  className="object-contain"
                />
              </div>

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
                    src="/images/product/nexo-one-hero.webp"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 768px) 76vw, (max-width: 1200px) 58vw, 820px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <MaterialCallout
            refCallback={(element) => {
              calloutRefs.current[0] = element;
            }}
            className="top-[31%] left-[5%]"
            number="01"
            align="left"
            material={materials[0]}
          />

          <MaterialCallout
            refCallback={(element) => {
              calloutRefs.current[1] = element;
            }}
            className="top-[31%] right-[5%]"
            number="02"
            align="right"
            material={materials[1]}
          />

          <MaterialCallout
            refCallback={(element) => {
              calloutRefs.current[2] = element;
            }}
            className="bottom-[15%] left-[5%]"
            number="03"
            align="left"
            material={materials[2]}
          />

          <MaterialCallout
            refCallback={(element) => {
              calloutRefs.current[3] = element;
            }}
            className="right-[5%] bottom-[15%]"
            number="04"
            align="right"
            material={materials[3]}
          />

          <div className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 text-center">
            <div className="text-[0.5rem] tracking-[0.2em] text-black/25 uppercase">
              Scroll to deconstruct
            </div>

            <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-black/25 to-transparent" />
          </div>
        </Container>
      </div>
    </section>
  );
}

type MaterialCalloutProps = {
  refCallback: (element: HTMLDivElement | null) => void;
  className: string;
  number: string;
  align: "left" | "right";
  material:
    | {
        name: string;
        description: string;
        position: string;
      }
    | undefined;
};

function MaterialCallout({
  refCallback,
  className,
  number,
  align,
  material,
}: MaterialCalloutProps) {
  const rightAligned = align === "right";

  return (
    <div
      ref={refCallback}
      className={`absolute z-30 hidden max-w-[15rem] md:block ${className} ${
        rightAligned ? "text-right" : ""
      }`}
    >
      <div
        className={`flex items-center gap-4 ${
          rightAligned ? "justify-end" : ""
        }`}
      >
        {rightAligned ? <div className="h-px w-14 bg-black/20" /> : null}

        <span className="font-display text-4xl text-black/15">{number}</span>

        {!rightAligned ? <div className="h-px w-14 bg-black/20" /> : null}
      </div>

      <div className="mt-3 text-[0.58rem] tracking-[0.17em] text-black/35 uppercase">
        {material?.position}
      </div>

      <h3 className="mt-3 text-lg font-medium tracking-[-0.03em]">
        {material?.name}
      </h3>

      <p className="mt-3 text-sm leading-6 text-black/45">
        {material?.description}
      </p>
    </div>
  );
}

