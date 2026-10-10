"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export function Hero({ imageSrc = "/uploads/home-hero-p9030024.jpg", imageAlt = "Studio Phazant — handcrafted lounge chairs" }: {
  imageSrc?: string;
  imageAlt?: string;
}) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setHasScrolled(window.scrollY > 0);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

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
        <svg
          aria-hidden="true"
          viewBox="0 0 24 32"
          className={`pointer-events-none absolute bottom-6 left-1/2 hidden h-8 w-6 -translate-x-1/2 text-[#ffe28a] transition-opacity duration-200 motion-reduce:transition-none md:block ${hasScrolled ? "opacity-0" : "opacity-100"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v24m-7-7 7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
