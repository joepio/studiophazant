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
  compact?: boolean;
  fullBleed?: boolean;
}

const tileColors = ["bg-[#56894f]", "bg-[#bedfe3]", "bg-[#ffdd82]", "bg-[#d89557]"];
const tileShapes = [
  "rounded-[42%_58%_52%_48%]",
  "rounded-[55%_45%_44%_56%]",
  "rounded-[49%_51%_58%_42%]",
  "rounded-[58%_42%_48%_52%]",
];
const organicShapes = [
  // Wide asymmetric Bézier contours based on the provided subtract shapes.
  "M 667.503 60 C 106.504 26.5 100.5 441 179.503 822.5 C 258.503 1204 523.491 1353.12 844.009 1343 C 1209.14 1331.47 1403.08 966.928 1332.5 608.5 C 1276.39 323.559 1015.5 100 667.503 60 Z",
  "M 733.508 84 C 409.593 84 84.001 159.5 84.001 725.5 C 84.001 1079.79 62.008 1378.5 733.508 1367 C 1282.93 1357.59 1396.51 1079.79 1396.51 725.5 C 1382.01 396 1467.51 84 733.508 84 Z",
  "M 860.002 74 C 264.033 42 173.991 655 171.031 722.5 C 168.071 790.001 60 1345.5 667.501 1369 C 1274.84 1392.49 1343.99 722.859 1344.03 722.5 C 1344.03 722.5 1455.97 106.001 860.002 74 Z",
];

export function PortfolioSection({ id, title, projects, compact = false, fullBleed = false }: PortfolioSectionProps) {
  if (!projects.length) return null;

  return (
    <section
      id={id}
      className={cn(
        "w-full scroll-mt-8",
        compact ? "bg-transparent" : "bg-[#f7f1e8] px-6 py-16 md:py-24",
      )}
    >
      <div className={cn(compact ? "w-full" : "max-w-6xl mx-auto")}>
        {!compact && (
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2 className="font-serif italic uppercase tracking-[0.16em] text-[#4b7f4a] text-3xl md:text-5xl">
              {title}
            </h2>
            <span className="text-[#4b7f4a] text-[10px] uppercase tracking-[0.28em]">
              {String(projects.length).padStart(2, "0")} pieces
            </span>
          </div>
        )}
        <div
          className={cn(
            "grid",
            compact
              ? fullBleed
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
                : "grid-cols-3 gap-0"
              : "grid-cols-2 md:grid-cols-4 gap-4 md:gap-7",
          )}
        >
          {projects.map((item, i) => (
            <Link
              key={item.id}
              href={`/projects/${item.id}`}
              className={cn(
                "group relative overflow-hidden block",
                compact
                  ? fullBleed
                    ? "portfolio-tile aspect-square p-0"
                    : "portfolio-tile aspect-[1/0.9] p-0"
                  : "aspect-square p-3 md:p-5",
                compact && fullBleed && i % 2 === 1
                  ? "bg-[#f7f1e8]"
                  : tileColors[fullBleed ? Math.floor(i / 2) % 3 : i % tileColors.length],
              )}
            >
              {compact ? (
                fullBleed && i % 2 === 1 ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33.33vw, 50vw"
                    className="portfolio-tile__image object-cover"
                  />
                ) : (
                  <svg
                    viewBox="0 0 1467 1458"
                    preserveAspectRatio="none"
                    className="relative h-full w-full"
                    aria-label={item.title}
                    role="img"
                  >
                    <defs>
                      <clipPath id={`organic-${item.id}-${i}`} clipPathUnits="userSpaceOnUse">
                        <path
                          className="portfolio-tile__shape"
                          d={organicShapes[i % organicShapes.length]}
                          style={
                            {
                              "--shape-base": `path("${organicShapes[i % organicShapes.length]}")`,
                              "--shape-hover": `path("${organicShapes[(i + 1) % organicShapes.length]}")`,
                            } as React.CSSProperties
                          }
                        />
                      </clipPath>
                    </defs>
                    <image
                      href={item.imageUrl}
                      x="0"
                      y="0"
                      width="1467"
                      height="1458"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#organic-${item.id}-${i})`}
                      className="portfolio-tile__image"
                    />
                  </svg>
                )
              ) : (
                <div
                  className={cn(
                    "relative h-full w-full overflow-hidden",
                    tileShapes[i % tileShapes.length],
                  )}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-[#203720]/75 via-transparent to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <h3 className="font-serif italic text-[#fff4d1] text-xl md:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )}
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
