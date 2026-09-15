"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import {
  fadeDown,
  premiumEase,
  transitionMedium,
} from "@/lib/animations/motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeDown}
        className="fixed inset-x-0 top-0 z-50"
      >
        <Container>
          <div className="mt-4 flex h-16 items-center justify-between rounded-full border border-white/10 bg-black/60 px-5 backdrop-blur-xl md:mt-6 md:h-18 md:px-7">
            <Link
              href="/"
              className="font-display text-2xl leading-none tracking-[0.08em]"
              aria-label="NEXO home"
            >
              {siteConfig.brand.name}
            </Link>

            <nav
              className="hidden items-center gap-8 lg:flex"
              aria-label="Primary navigation"
            >
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-sm text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {item.label}

                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="hidden items-center lg:flex">
              <Button href="#product" className="px-5 py-2.5">
                Explore
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex h-10 items-center justify-center rounded-full border border-white/15 px-4 text-xs font-medium tracking-[0.12em] text-white lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
            >
              MENU
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: premiumEase }}
            className="fixed inset-0 z-[60] bg-black"
          >
            <Container className="flex min-h-screen flex-col">
              <div className="flex h-24 items-center justify-between">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="font-display text-2xl leading-none tracking-[0.08em]"
                >
                  {siteConfig.brand.name}
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-10 items-center justify-center rounded-full border border-white/15 px-4 text-xs font-medium tracking-[0.12em]"
                  aria-label="Close navigation menu"
                >
                  CLOSE
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center">
                {siteConfig.navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...transitionMedium,
                      delay: 0.08 + index * 0.07,
                    }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between py-5"
                    >
                      <span className="font-display text-[clamp(3.5rem,14vw,7rem)] leading-[0.85] uppercase">
                        {item.label}
                      </span>

                      <span className="text-sm text-white/40 transition-transform duration-500 group-hover:translate-x-2">
                        ↗
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex items-center justify-between border-t border-white/10 py-6 text-xs tracking-[0.12em] text-white/40 uppercase">
                <span>{siteConfig.brand.product}</span>
                <span>{siteConfig.brand.tagline}</span>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
