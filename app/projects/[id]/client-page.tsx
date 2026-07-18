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

  const infoColor = project.color || (project.category === "furniture" ? "#56894f" : "#bedfe3");
  const infoTextColor = infoColor === "#56894f" ? "#fff4d1" : "#315f5d";
  const remainingGallery = gallery.slice(1);

  return (
    <article className="w-full">
      {gallery[0] && (
        <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#203720]">
          <Image
            src={gallery[0]}
            alt={`${project.title || "Project"} — afbeelding 1`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
          <div
            className="absolute bottom-6 left-6 max-w-[calc(100%-3rem)] p-5 md:bottom-10 md:left-10 md:max-w-xl md:p-8"
            style={{ backgroundColor: infoColor, color: infoTextColor }}
          >
            <p className="font-ui-sans mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] opacity-80">
              {project.category}
            </p>
            <h1 className="font-serif text-4xl italic leading-none tracking-tight md:text-6xl">
              {project.title}
            </h1>
            {project.description && (
              <p className="mt-5 max-w-lg font-ui-sans text-sm leading-relaxed md:text-base">
                {project.description}
              </p>
            )}
          </div>
        </section>
      )}

      {remainingGallery.length > 0 && (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 py-16 md:grid-cols-12 md:gap-6 md:py-24">
          {remainingGallery.map((src, i) => (
          <div
            key={src + i}
            className={cn(
              "relative w-full overflow-hidden bg-muted/20 col-span-1 aspect-[4/3]",
              PATTERN[(i + 1) % PATTERN.length]
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
      )}
    </article>
  );
}
