import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { nexoOne } from "@/data/product";

export function Colorways() {
  return (
    <section
      id="colorways"
      className="relative bg-[#f1f0eb] py-24 text-black md:py-32"
    >
      <Container>
        <div className="mb-12">
          <div className="text-[0.6rem] tracking-[0.2em] text-black/35 uppercase">
            NEXO / COLLECTION
          </div>

          <h2 className="font-display mt-4 text-[clamp(4rem,8vw,8rem)] leading-[0.82] uppercase">
            Four expressions.
            <br />
            One system.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {nexoOne.colorways.map((colorway, index) => (
            <div
              key={colorway.id}
              className="relative overflow-hidden rounded-[1.5rem] bg-black"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={colorway.image}
                  alt={`NEXO ONE ${colorway.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="border-t border-white/10 p-5 text-white">
                <div className="text-[0.55rem] tracking-[0.18em] text-white/35 uppercase">
                  COLORWAY 0{index + 1}
                </div>

                <div className="font-display mt-2 text-3xl uppercase">
                  {colorway.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
