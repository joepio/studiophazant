import React from "react";
import Image from "next/image";
import Link from "next/link";

export function AboutTeaser() {
  return (
    <section className="w-full mb-16 md:mb-24">
      <div className="relative w-full py-16 md:py-28">
        <Image
          src="/uploads/achtergrond_1.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative max-w-3xl mx-auto px-6">
          <Link
            href="/about"
            className="group block bg-background shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
              <div className="px-8 md:px-12 py-10 md:py-14">
                <p className="font-script text-accent leading-none text-5xl md:text-6xl">
                  about
                </p>
                <p className="font-script text-accent leading-tight mt-2 text-5xl md:text-6xl">
                  Studio
                  <br />
                  Phazant
                </p>
              </div>
              <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden">
                <Image
                  src="/uploads/blokstoel_1.jpg"
                  alt="Studio Phazant"
                  fill
                  sizes="(min-width: 640px) 24rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
