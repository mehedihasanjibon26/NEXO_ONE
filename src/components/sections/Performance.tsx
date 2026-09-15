"use client";

import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { nexoOne } from "@/data/product";
import { getGsap } from "@/lib/animations/gsap";

export function Performance() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  const metricRefs = useRef<Array<HTMLDivElement | null>>([]);
  const valueRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !introRef.current ||
      !titleRef.current ||
      !copyRef.current ||
      !closingRef.current
    ) {
      return;
    }

    const { gsap } = getGsap();

    const context = gsap.context(() => {
      gsap.set(introRef.current, {
        opacity: 0,
        y: 50,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        yPercent: 35,
      });

      gsap.set(copyRef.current.children, {
        opacity: 0,
        y: 24,
      });

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          end: "top 32%",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      introTimeline
        .to(
          introRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "none",
          },
          0,
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            yPercent: 0,
            ease: "none",
          },
          0.08,
        )
        .to(
          copyRef.current.children,
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            ease: "none",
          },
          0.32,
        );

      metricRefs.current.forEach((metric, index) => {
        if (!metric) return;

        const value = valueRefs.current[index];
        const line = lineRefs.current[index];

        gsap.set(metric, {
          opacity: 0.22,
          y: 50,
          scale: 0.965,
        });

        if (value) {
          gsap.set(value, {
            xPercent: index % 2 === 0 ? -12 : 12,
            opacity: 0.25,
          });
        }

        if (line) {
          gsap.set(line, {
            scaleX: 0,
            transformOrigin: index % 2 === 0 ? "left center" : "right center",
          });
        }

        const metricTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: metric,
            start: "top 88%",
            end: "center 58%",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });

        metricTimeline
          .to(
            metric,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "none",
            },
            0,
          )
          .to(
            value,
            {
              xPercent: 0,
              opacity: 1,
              ease: "none",
            },
            0.05,
          )
          .to(
            line,
            {
              scaleX: 1,
              ease: "none",
            },
            0.18,
          );
      });

      gsap.fromTo(
        closingRef.current,
        {
          opacity: 0.15,
          y: 45,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 88%",
            end: "center 68%",
            scrub: 0.8,
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
      id="performance"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[25%] left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-white/[0.045] blur-[140px]" />

        <div className="absolute top-[65%] left-[5%] h-[26rem] w-[26rem] rounded-full bg-white/[0.02] blur-[110px]" />

        <div className="absolute top-[76%] right-[2%] h-[28rem] w-[28rem] rounded-full bg-white/[0.025] blur-[120px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <Container className="relative py-24 md:py-32">
        {/* Intro */}
        <div
          ref={introRef}
          className="grid gap-10 lg:grid-cols-[0.65fr_2.35fr]"
        >
          <div>
            <div className="text-label text-white/35">PERFORMANCE / 005</div>
          </div>

          <div>
            <div className="overflow-hidden">
              <h2
                ref={titleRef}
                className="font-display max-w-[70rem] text-[clamp(4.5rem,10vw,10rem)] leading-[0.78] uppercase"
              >
                Less weight.
                <br />
                More response.
              </h2>
            </div>

            <div
              ref={copyRef}
              className="mt-8 grid gap-6 border-t border-white/10 pt-7 md:grid-cols-2"
            >
              <p className="max-w-xl text-[clamp(1.25rem,1.8vw,1.8rem)] leading-[1.2] tracking-[-0.035em] text-white/75">
                Performance comes from balancing weight, cushioning, traction,
                and sustained comfort.
              </p>

              <p className="text-body max-w-md text-white/40 md:justify-self-end">
                NEXO ONE combines each system into a single movement-focused
                platform.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-20 grid border-t border-white/10 md:grid-cols-2">
          {nexoOne.features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(element) => {
                metricRefs.current[index] = element;
              }}
              className={`relative min-h-[22rem] overflow-hidden border-b border-white/10 py-10 md:min-h-[26rem] md:px-8 md:py-12 ${
                index % 2 === 0 ? "md:border-r" : ""
              }`}
            >
              <div
                ref={(element) => {
                  lineRefs.current[index] = element;
                }}
                className="absolute inset-x-0 top-0 h-px bg-white/25"
              />

              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-6">
                  <div className="text-[0.65rem] tracking-[0.16em] text-white/30 uppercase">
                    0{index + 1}
                  </div>

                  <div className="text-right text-[0.62rem] tracking-[0.14em] text-white/25 uppercase">
                    {feature.title}
                  </div>
                </div>

                <div className="mt-12">
                  <div
                    ref={(element) => {
                      valueRefs.current[index] = element;
                    }}
                    className="font-display text-[clamp(5.5rem,10vw,10rem)] leading-[0.72] will-change-transform"
                  >
                    {feature.value}
                  </div>

                  <h3 className="mt-6 text-[clamp(1.65rem,2.8vw,3rem)] leading-[0.95] font-medium tracking-[-0.05em]">
                    {feature.title}
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-6 text-white/42">
                    {feature.description}
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-px w-10 bg-white/20" />

                    <span className="text-[0.58rem] tracking-[0.16em] text-white/25 uppercase">
                      NEXO PERFORMANCE SYSTEM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div
          ref={closingRef}
          className="flex items-end justify-between gap-10 border-b border-white/10 py-16 md:py-20"
        >
          <div className="text-label text-white/30">BUILT AS ONE SYSTEM</div>

          <p className="font-display max-w-3xl text-right text-[clamp(2.8rem,6vw,6rem)] leading-[0.82] text-white uppercase">
            Every step.
            <br />
            One system.
          </p>
        </div>
      </Container>
    </section>
  );
}
