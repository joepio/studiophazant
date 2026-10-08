import React from "react";
import Image from "next/image";

export function Hero({ imageSrc = "/uploads/home-hero-p9030024.jpg", imageAlt = "Studio Phazant — handcrafted lounge chairs" }: {
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="w-full">
      <div className="@container relative h-[98svh] overflow-hidden bg-[#1c321e]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[14%_60%] scale-[1.05] origin-[50%_40%] md:object-[60%_60%] md:scale-100"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-[29svh] md:translate-y-0">
          <h1 className="font-script text-[#ffe28a] text-center leading-[0.9] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] text-[19.44vw] md:text-[15vw] -rotate-[9deg] -translate-x-[4%] -translate-y-[3%]">
            <span className="block translate-x-[6%]">Studio</span>
            <span className="block -translate-x-[6%]">Phazant</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
