import React from "react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-background text-foreground flex flex-col items-center justify-center text-center px-4">
      <h1 className={cn(
        "text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter mb-6 text-primary"
      )}>
        Studio Phazant
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl font-sans max-w-2xl text-muted-foreground">
        Crafting visual stories with a touch of nostalgia and modern precision.
      </p>
    </section>
  );
}
