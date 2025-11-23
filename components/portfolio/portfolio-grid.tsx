import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  color: string; // For the background/overlay effect
  span?: string; // col-span-1 or col-span-2
}

const SAMPLE_ITEMS: PortfolioItem[] = [
  {
    id: "1",
    title: "Grafische Posters",
    category: "Print Design",
    imageUrl: "https://images.unsplash.com/photo-1572044162444-ad602110a5c5?w=800&q=80",
    color: "bg-primary",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "2",
    title: "Design Verpakking",
    category: "Packaging",
    imageUrl: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80",
    color: "bg-secondary",
  },
  {
    id: "3",
    title: "Fotografie Inspiratie",
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1554048612-387768052bf7?w=800&q=80",
    color: "bg-muted",
  },
  {
    id: "4",
    title: "Muted Black",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    color: "bg-accent",
  },
  {
    id: "5",
    title: "Slowtide X Old Pal",
    category: "Collaboration",
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    color: "bg-destructive",
  },
  {
    id: "6",
    title: "May Palette",
    category: "Color Study",
    imageUrl: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80",
    color: "bg-chart-2",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "7",
    title: "Guadachi",
    category: "Identity",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    color: "bg-chart-3",
  },
];

export function PortfolioGrid() {
  return (
    <section className="w-full px-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {SAMPLE_ITEMS.map((item) => (
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
