import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

interface PortfolioSectionProps {
  id?: string;
  title: string;
  projects: PortfolioItem[];
}

const cellPatterns = [
  "col-span-6 sm:col-span-3 md:col-span-2 aspect-[3/2]",
  "col-span-6 sm:col-span-3 md:col-span-2 aspect-[3/2]",
  "col-span-6 sm:col-span-6 md:col-span-2 aspect-[3/2]",
  "col-span-6 sm:col-span-3 md:col-span-3 aspect-[2/1]",
  "col-span-6 sm:col-span-3 md:col-span-3 aspect-[2/1]",
  "col-span-6 sm:col-span-6 md:col-span-2 aspect-[3/2]",
];

export function PortfolioSection({ id, title, projects }: PortfolioSectionProps) {
  if (!projects.length) return null;

  return (
    <section id={id} className="w-full px-6 mb-16 md:mb-24 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif italic uppercase tracking-[0.25em] text-primary text-center text-xl md:text-2xl mb-8 md:mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-6 gap-3 md:gap-4">
          {projects.map((item, i) => (
            <Link
              key={item.id}
              href={`/projects/${item.id}`}
              className={cn(
                "group relative overflow-hidden block",
                cellPatterns[i % cellPatterns.length]
              )}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/0 group-hover:bg-primary/85 transition-colors duration-500 ease-out pointer-events-none">
                <h3 className="font-serif italic text-background text-3xl md:text-4xl text-center px-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                  {item.title}
                </h3>
              </div>
              <span className="sr-only">
                {item.title} — {item.category}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioGrid({ projects }: { projects: PortfolioItem[] }) {
  return <PortfolioSection id="furniture" title="Furniture" projects={projects} />;
}
