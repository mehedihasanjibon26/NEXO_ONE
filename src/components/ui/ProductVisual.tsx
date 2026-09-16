"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { transitionSlow } from "@/lib/animations/motion";

type ProductVisualProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function ProductVisual({
  src,
  alt,
  priority = false,
  className = "",
}: ProductVisualProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.92,
        rotate: -5,
        y: 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: -8,
        y: 0,
      }}
      transition={{
        ...transitionSlow,
        delay: 0.25,
      }}
      className={`relative mx-auto aspect-[16/8] w-full max-w-5xl ${className}`.trim()}
    >
      <div
        aria-hidden="true"
        className="absolute top-[72%] left-1/2 h-[16%] w-[58%] -translate-x-1/2 rounded-[50%] bg-white/10 blur-3xl"
      />

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 75vw, 1000px"
        className="object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.5)]"
      />
    </motion.div>
  );
}

