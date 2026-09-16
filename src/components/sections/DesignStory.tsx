"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getGsap } from "@/lib/animations/gsap";
import { fadeUp, staggerContainer } from "@/lib/animations/motion";

const designDetails = [
  {
    value: "285G",
    label: "Lightweight build",
  },
  {
    value: "42MM",
    label: "Sculpted cushioning",
  },
  {
    value: "360Â°",
    label: "Adaptive traction",
  },
];

export function DesignStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !curtainRef.current || !introRef.current) {
      return;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      gsap.set(curtainRef.current, {
        scaleY: 1,
        transformOrigin: "top center",
      });

      gsap.set(introRef.current, {
        y: 45,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 38%",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          curtainRef.current,
          {
            scaleY: 0,
            ease: "none",
          },
          0,
        )
        .to(
          introRef.current,
          {
            y: 0,
            opacity: 1,
            ease: "none",
          },
          0.12,
        );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="design"
      className="relative overflow-hidden bg-[#f1f0eb] text-black"
    >
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 bg-black will-change-transform"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[-12rem] h-[32rem] w-[32rem] rounded-full bg-black/[0.035] blur-[110px]" />

        <div className="absolute top-[55%] right-[-14rem] h-[38rem] w-[38rem] rounded-full bg-black/[0.04] blur-[120px]" />

        <div className="absolute top-0 left-1/2 h-px w-[85%] -translate-x-1/2 bg-black/10" />
      </div>

      <Container className="relative">
        <div className="flex min-h-screen flex-col justify-between py-24 md:py-32 lg:py-36">
          <div
            ref={introRef}
            className="grid gap-12 lg:grid-cols-[0.8fr_2.2fr]"
          >
            <div>
              <SectionLabel className="text-black/45">
                Design / 002
              </SectionLabel>
            </div>

            <div className="max-w-[68rem]">
              <h2 className="font-display text-[clamp(4.5rem,11vw,11rem)] leading-[0.82] tracking-[-0.02em] uppercase">
                Form follows
                <br />
                movement.
              </h2>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={staggerContainer}
            className="mt-24 grid gap-16 border-t border-black/15 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
          >
            <motion.div variants={fadeUp} className="max-w-2xl">
              <p className="text-[clamp(1.5rem,2.4vw,2.5rem)] leading-[1.15] tracking-[-0.04em] text-black/90">
                Every line of NEXO ONE is shaped around forward motion.
                Structure is reduced where weight is unnecessary and reinforced
                where movement demands control.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-5">
              {designDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="border-l border-black/15 pl-4 md:pl-6"
                >
                  <div className="font-display text-[clamp(2.5rem,4vw,4.5rem)] leading-none">
                    {detail.value}
                  </div>

                  <div className="mt-3 max-w-[7rem] text-[0.68rem] leading-[1.45] tracking-[0.12em] text-black/45 uppercase md:text-xs">
                    {detail.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="relative border-t border-black/15 py-24 md:py-32">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid gap-10 lg:grid-cols-2 lg:items-end"
          >
            <div>
              <div className="text-label text-black/35">
                SCULPTED PERFORMANCE
              </div>

              <p className="text-body-lg mt-5 max-w-xl text-black/60">
                Technical geometry, engineered mesh, responsive cushioning, and
                controlled negative space combine into a silhouette that looks
                fast even before it moves.
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <div className="font-display text-[clamp(4rem,9vw,9rem)] leading-[0.78] text-black/[0.08]">
                01
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

