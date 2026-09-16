"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { getGsap } from "@/lib/animations/gsap";

const showcaseSteps = [
  {
    number: "01",
    label: "SILHOUETTE",
    title: "Sculpted for forward motion.",
    description:
      "A low visual center, flowing heel structure, and directional geometry give NEXO ONE a silhouette that feels in motion even at rest.",
  },
  {
    number: "02",
    label: "STRUCTURE",
    title: "Support without unnecessary mass.",
    description:
      "Layered technical zones reinforce high-load areas while open geometry and engineered mesh reduce visual and physical weight.",
  },
  {
    number: "03",
    label: "STANCE",
    title: "Built around controlled energy.",
    description:
      "The exaggerated midsole and segmented base create a planted stance while maintaining the progressive character of the shoe.",
  },
];

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !curtainRef.current ||
      !productRef.current ||
      !glowRef.current ||
      !introRef.current
    ) {
      return;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      gsap.set(curtainRef.current, {
        scaleY: 1,
        transformOrigin: "top center",
      });

      gsap.set(introRef.current, {
        opacity: 0,
        y: 55,
      });

      gsap.set(productRef.current, {
        opacity: 0,
        scale: 0.82,
        rotate: -12,
        yPercent: 12,
      });

      const entranceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 28%",
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
          productRef.current,
          {
            opacity: 1,
            scale: 0.94,
            rotate: -7,
            yPercent: 4,
            ease: "none",
          },
          0.12,
        )
        .to(
          introRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "none",
          },
          0.25,
        );

      gsap.to(productRef.current, {
        rotate: 7,
        scale: 1.08,
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 25%",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        glowRef.current,
        {
          scale: 0.75,
          opacity: 0.25,
        },
        {
          scale: 1.3,
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
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
      id="technology"
      className="relative bg-black text-white"
    >
      {/* Light-to-dark transition curtain */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-40 h-screen bg-[#f1f0eb] will-change-transform"
      />

      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          ref={glowRef}
          className="absolute top-[36%] left-[24%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/[0.055] blur-[120px] will-change-transform"
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          {/* Sticky sneaker stage */}
          <div className="relative min-h-[70vh] lg:min-h-[240vh]">
            <div className="flex min-h-[70vh] items-center justify-center lg:sticky lg:top-0 lg:h-screen">
              <div className="relative flex w-full items-center justify-center">
                <div
                  aria-hidden="true"
                  className="font-display absolute text-[clamp(7rem,18vw,18rem)] leading-none text-white/[0.025]"
                >
                  ONE
                </div>

                <div
                  ref={productRef}
                  className="relative z-10 aspect-[4/3] w-[120%] max-w-[58rem] will-change-transform lg:-ml-[8%]"
                >
                  <Image
                    src="/images/product/nexo-one-hero.webp"
                    alt="NEXO ONE premium performance sneaker"
                    fill
                    sizes="(max-width: 1024px) 95vw, 55vw"
                    className="object-contain drop-shadow-[0_45px_70px_rgba(255,255,255,0.05)]"
                  />
                </div>

                <div className="absolute bottom-[16%] left-1/2 h-px w-[68%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* Story column */}
          <div className="relative border-white/10 lg:border-l">
            <div
              ref={introRef}
              className="flex min-h-[70vh] flex-col justify-end border-b border-white/10 py-20 lg:min-h-screen lg:px-14 lg:py-24"
            >
              <div className="text-label text-white/35">PRODUCT / 003</div>

              <h2 className="font-display mt-6 max-w-xl text-[clamp(4.5rem,8vw,8.5rem)] leading-[0.82] uppercase">
                Engineered
                <br />
                in motion.
              </h2>

              <p className="text-body-lg mt-8 max-w-md text-white/45">
                NEXO ONE is designed as a single continuous object. Every
                surface, cutout, and structural transition contributes to the
                feeling of forward movement.
              </p>
            </div>

            {showcaseSteps.map((step) => (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0.25,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  amount: 0.55,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex min-h-[72vh] flex-col justify-center border-b border-white/10 py-20 lg:min-h-screen lg:px-14 lg:py-24"
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="text-label text-white/30">{step.label}</span>

                  <span className="font-display text-5xl leading-none text-white/10">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-10 max-w-xl text-[clamp(2rem,4vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.055em]">
                  {step.title}
                </h3>

                <p className="text-body-lg mt-7 max-w-md text-white/45">
                  {step.description}
                </p>

                <div className="mt-12 h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

