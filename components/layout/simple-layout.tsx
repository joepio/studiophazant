"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Monogram } from "@/components/portfolio/monogram";

const navLinks = [
  { label: "furniture", href: "/#furniture" },
  { label: "objects", href: "/#objects" },
  { label: "interiors", href: "/#interiors" },
  { label: "about", href: "/about" },
  { label: "contact", href: "mailto:info@studiophazant.nl" },
];

const leftLinks = navLinks.slice(0, 3);
const rightLinks = navLinks.slice(3);

function DesktopNavList({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <ul className="flex items-center gap-5 lg:gap-7 font-serif italic text-primary text-xl lg:text-2xl">
      {items.map((item, i) => (
        <React.Fragment key={item.href}>
          {i > 0 && (
            <li
              aria-hidden
              className="w-px h-5 lg:h-6 bg-foreground self-center"
            />
          )}
          <li>
            <Link
              href={item.href}
              className="hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
}

export function SimpleLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full pt-6 pb-4 px-6 relative z-30">
        {/* Mobile: hamburger left, logo right */}
        <div className="md:hidden flex items-center justify-between max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="text-primary p-1 -ml-1"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" aria-label="Studio Phazant home">
            <Monogram size="md" />
          </Link>
        </div>

        {/* Desktop: items at outer edges, logo centered between the two with equal spacing */}
        <nav className="hidden md:grid max-w-5xl mx-auto grid-cols-[auto_1fr_auto_1fr_auto] items-center">
          <DesktopNavList items={leftLinks} />
          <div aria-hidden />
          <Link href="/" aria-label="Studio Phazant home" className="shrink-0">
            <Monogram size="lg" />
          </Link>
          <div aria-hidden />
          <DesktopNavList items={rightLinks} />
        </nav>
      </header>

      {/* Mobile fullscreen overlay menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute top-6 right-6">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-primary p-1"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="h-full flex flex-col items-center justify-center px-6">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            aria-label="Studio Phazant home"
            className="mb-10"
          >
            <Monogram size="lg" />
          </Link>
          <ul className="flex flex-col items-center gap-6 font-serif italic text-primary text-3xl">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <footer className="w-full py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3">
          <Link href="/" aria-label="Studio Phazant home">
            <Monogram size="sm" />
          </Link>
          <span className="text-xs text-muted-foreground font-serif italic">
            © {new Date().getFullYear()} Studio Phazant
          </span>
        </div>
      </footer>
    </div>
  );
}
