import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  color: string;
  span?: string;
}

interface PortfolioGridProps {
  projects: PortfolioItem[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <section className="w-full px-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {projects.map((item) => (
          <Link
            key={item.id}
            href={`/projects/${item.id}`}
            className={cn(
              "group relative overflow-hidden rounded-lg aspect-[4/5] cursor-pointer block",
              item.span || "col-span-1"
            )}
          >
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10 flex flex-col justify-end p-6",
              item.color
            )}>
              <span className="text-sm font-medium uppercase tracking-widest text-white/80 mb-2">
                {item.category}
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                {item.title}
              </h3>
            </div>
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
