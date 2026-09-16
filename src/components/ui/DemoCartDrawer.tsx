"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";

import { useProductExperience } from "@/components/layout/ProductExperienceProvider";
import { nexoOne } from "@/data/product";

export function DemoCartDrawer() {
  const {
    selectedColorwayId,
    selectedSize,
    cartQuantity,
    isCartOpen,
    closeCart,
  } = useProductExperience();

  const selectedColorway = useMemo(
    () =>
      nexoOne.colorways.find(
        (colorway) => colorway.id === selectedColorwayId,
      ) ?? nexoOne.colorways[0],
    [selectedColorwayId],
  );

  const subtotal = nexoOne.price * cartQuantity;

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeCart}
            className="fixed inset-0 z-[90] cursor-default bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed top-0 right-0 z-[100] flex h-dvh w-full max-w-[31rem] flex-col bg-[#f1f0eb] text-black shadow-[-30px_0_80px_rgba(0,0,0,0.35)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-6 md:px-8">
              <div>
                <div className="text-[0.6rem] tracking-[0.18em] text-black/35 uppercase">
                  NEXO / DEMO CART
                </div>

                <div className="font-display mt-1 text-3xl leading-none uppercase">
                  Your selection
                </div>
              </div>

              <motion.button
                type="button"
                onClick={closeCart}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-xl"
                aria-label="Close cart"
              >
                Ã—
              </motion.button>
            </div>

            {/* Cart content */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-black">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09),transparent_62%)]"
                />

                <Image
                  src={selectedColorway.image}
                  alt={`NEXO ONE ${selectedColorway.name}`}
                  fill
                  sizes="500px"
                  className="relative z-10 object-contain p-5"
                />

                <div className="absolute bottom-5 left-5 z-20 text-[0.58rem] tracking-[0.18em] text-white/40 uppercase">
                  NEXO ONE
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <div className="text-[0.6rem] tracking-[0.16em] text-black/35 uppercase">
                      Performance sneaker
                    </div>

                    <h3 className="font-display mt-2 text-5xl leading-none uppercase">
                      NEXO ONE
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-[0.6rem] tracking-[0.16em] text-black/35 uppercase">
                      Price
                    </div>

                    <div className="mt-2 text-lg font-medium">
                      ${nexoOne.price}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
                  <div className="flex items-center justify-between py-5">
                    <span className="text-xs tracking-[0.14em] text-black/40 uppercase">
                      Color
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="text-sm">{selectedColorway.name}</span>

                      <span
                        className="h-4 w-4 rounded-full border border-black/10"
                        style={{
                          backgroundColor: selectedColorway.hex,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-5">
                    <span className="text-xs tracking-[0.14em] text-black/40 uppercase">
                      Size
                    </span>

                    <span className="text-sm">
                      {selectedSize !== null ? `US ${selectedSize}` : "â€”"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-5">
                    <span className="text-xs tracking-[0.14em] text-black/40 uppercase">
                      Quantity
                    </span>

                    <span className="text-sm">{cartQuantity}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-end justify-between">
                  <div className="text-xs tracking-[0.14em] text-black/40 uppercase">
                    Demo subtotal
                  </div>

                  <div className="font-display text-5xl leading-none">
                    ${subtotal}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="border-t border-black/10 bg-[#f1f0eb] px-6 py-6 md:px-8">
              <button
                type="button"
                className="flex w-full items-center justify-center bg-black px-6 py-4 text-xs font-medium tracking-[0.14em] text-white uppercase"
              >
                Demo Checkout
              </button>

              <button
                type="button"
                onClick={closeCart}
                className="mt-3 flex w-full items-center justify-center border border-black/15 px-6 py-4 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:bg-black/5"
              >
                Continue Exploring
              </button>

              <p className="mt-4 text-center text-[0.65rem] leading-5 text-black/35">
                Concept experience only. No payment will be processed.
              </p>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

