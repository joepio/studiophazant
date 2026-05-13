import React from "react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="w-full px-6">
      <div className="@container relative max-w-5xl mx-auto aspect-[16/10] overflow-hidden">
        <Image
          src="/uploads/stoelen_4.jpg"
          alt="Studio Phazant — handcrafted lounge chairs"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="font-script text-white text-center leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] text-[20cqw] -rotate-[10deg] -translate-x-[6%] -translate-y-[6%]">
            <span className="block translate-x-[6%]">Studio</span>
            <span className="block -translate-x-[6%]">Phazant</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
