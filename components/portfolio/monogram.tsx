import React from "react";
import { cn } from "@/lib/utils";

type MonogramSize = "sm" | "md" | "lg";

const sizes: Record<MonogramSize, { bird: string; text: string }> = {
  sm: { bird: "h-[15px]", text: "h-7" },
  md: { bird: "h-[21px]", text: "h-9" },
  lg: { bird: "h-[30px]", text: "h-14" },
};

// % values are relative to the bird's own box, so they scale with every size:
//   x → 20% of bird width left   |   y → 15% of bird height down (overlaps the circle)
const BIRD_TRANSFORM = "-translate-x-[20%] translate-y-[15%]";

export function Monogram({
  className,
  size = "md",
  withBird = true,
}: {
  className?: string;
  size?: MonogramSize;
  withBird?: boolean;
}) {
  const s = sizes[size];
  return (
    <span className={cn("inline-flex flex-col items-center", className)}>
      {withBird && (
        <img
          src="/logo-phazant.svg"
          alt=""
          aria-hidden
          className={cn("block w-auto relative z-10", s.bird, BIRD_TRANSFORM)}
        />
      )}
      <img
        src="/logo-text.svg"
        alt="Studio Phazant"
        className={cn("block w-auto", s.text)}
      />
    </span>
  );
}
