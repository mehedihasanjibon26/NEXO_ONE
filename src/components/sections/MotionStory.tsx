"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { getGsap } from "@/lib/animations/gsap";

const motionPoints = [
  {
    number: "01",
    label: "CITY",
    title: "Built for daily movement.",
  },
  {
    number: "02",
    label: "PACE",
    title: "Responsive through every transition.",
  },
  {
    number: "03",
    label: "ALL DAY",
    title: "Comfort designed to keep moving.",
  },
];

export function MotionStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  const backgroundWordRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !shoeRef.current ||
      !backgroundWordRef.current ||
      !introRef.current
    ) {
      return;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      const validPoints = pointRefs.current.filter(Boolean);

      gsap.set(validPoints, {
        opacity: 0,
        x: -45,
        y: 18,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          shoeRef.current,
          {
            xPercent: -38,
            yPercent: 8,
            rotate: -12,
            scale: 0.88,
          },
          {
            xPercent: 2,
            yPercent: 0,
            rotate: -4,
            scale: 1,
            ease: "none",
          },
          0,
        )
        .to(
          shoeRef.current,
          {
            xPercent: 34,
            yPercent: -4,
            rotate: 6,
            scale: 1.08,
            ease: "none",
          },
          0.48,
        )
        .fromTo(
          backgroundWordRef.current,
          {
            xPercent: -14,
          },
          {
            xPercent: 10,
            ease: "none",
          },
          0,
        )
        .to(
          introRef.current,
          {
            opacity: 0.18,
            y: -28,
            ease: "none",
          },
          0.28,
        );

      pointRefs.current.forEach((point, index) => {
        if (!point) return;

        timeline.to(
          point,
          {
            opacity: 1,
            x: 0,
            y: 0,
            ease: "none",
          },
          0.46 + index * 0.12,
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
      id="motion"
      className="relative h-[160vh] bg-black text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute top-1/2 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-[150px]" />

          <div className="absolute top-[18%] left-[8%] h-[22rem] w-[22rem] rounded-full bg-white/[0.02] blur-[110px]" />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <Container className="relative h-full">
          {/* Intro */}
          <div
            ref={introRef}
            className="absolute inset-x-0 top-20 z-30 flex items-start justify-between md:top-24"
          >
            <div>
              <div className="text-label text-white/35">MOTION / 007</div>

              <h2 className="font-display mt-4 text-[clamp(3.5rem,7vw,7rem)] leading-[0.82] uppercase">
                Made to
                <br />
                keep moving.
              </h2>
            </div>

            <p className="hidden max-w-[18rem] text-right text-sm leading-6 text-white/40 md:block">
              From fast city transitions to long everyday wear, NEXO ONE is
              designed around constant movement.
            </p>
          </div>

          {/* Background typography */}
          <div
            ref={backgroundWordRef}
            aria-hidden="true"
            className="font-display pointer-events-none absolute top-1/2 left-[-12%] -translate-y-1/2 text-[clamp(12rem,34vw,34rem)] leading-none whitespace-nowrap text-white/[0.035] will-change-transform"
          >
            MOVE
          </div>

          {/* Shoe */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={shoeRef}
              className="relative z-20 aspect-[4/3] w-[88vw] max-w-[64rem] will-change-transform md:w-[68vw] lg:w-[58vw]"
            >
              <Image
                src="/images/product/nexo-one-hero.png"
                alt="NEXO ONE sneaker in motion"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 950px"
                className="object-contain drop-shadow-[0_40px_70px_rgba(255,255,255,0.06)]"
              />
            </div>
          </div>

          {/* Sequential feature points on left */}
          <div className="absolute bottom-[10%] left-0 z-30 w-full max-w-[18rem] space-y-6 md:bottom-[12%] lg:bottom-[14%]">
            {motionPoints.map((point, index) => (
              <div
                key={point.number}
                ref={(element) => {
                  pointRefs.current[index] = element;
                }}
                className="border-t border-white/10 pt-4 will-change-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="font-display text-4xl leading-none text-white/12">
                    {point.number}
                  </div>

                  <div>
                    <div className="text-[0.62rem] tracking-[0.16em] text-white/35 uppercase">
                      {point.label}
                    </div>

                    <p className="mt-2 max-w-[13rem] text-sm leading-5 text-white/70">
                      {point.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom indicator */}
          <div className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>
        </Container>
      </div>
    </section>
  );
}
