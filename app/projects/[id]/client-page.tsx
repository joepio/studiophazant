"use client";

import { useTina } from "tinacms/dist/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Playful repeating pattern over a 12-col grid. Each entry pairs a col-span
// with an aspect ratio so the photos stack into a varied, magazine-like layout.
const PATTERN = [
  "md:col-span-12 aspect-[16/9]",
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-5 aspect-[3/4]",
  "md:col-span-5 aspect-[3/4]",
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-12 aspect-[3/2]",
  "md:col-span-8 aspect-[3/2]",
  "md:col-span-4 aspect-[3/4]",
];

export function ProjectPageClient({ data, query, variables }: any) {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  const project = tinaData.project;
  const gallery: string[] =
    Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery
      : project.imageUrl
        ? [project.imageUrl]
        : [];

  return (
    <article className="max-w-5xl mx-auto px-6 pt-16 pb-24">
      <header className="mb-10 md:mb-14 max-w-3xl">
        <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-foreground">
          {project.title}
        </h1>
        {project.description && (
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mt-6 md:mt-8">
            {project.description}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {gallery.map((src, i) => (
          <div
            key={src + i}
            className={cn(
              "relative w-full overflow-hidden bg-muted/20 col-span-1 aspect-[4/3]",
              PATTERN[i % PATTERN.length]
            )}
          >
            <Image
              src={src}
              alt={`${project.title || ""} — afbeelding ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
