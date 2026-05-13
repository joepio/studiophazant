import React from "react";
import Image from "next/image";

export function TaglineStrip() {
  return (
    <section className="w-full mt-12 md:mt-16 mb-16 md:mb-24">
      <div className="relative w-full py-16 md:py-28">
        <Image
          src="/uploads/achtergrond_2.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="bg-background px-8 md:px-16 py-8 md:py-12 shadow-sm">
            <p className="font-serif italic text-xl md:text-3xl leading-relaxed text-accent">
              custom furniture, objects and interior projects.
              <br />
              designed and handmade with a sustainable approach
              <br />
              using locally sourced, reclaimed and eco-friendly materials
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
