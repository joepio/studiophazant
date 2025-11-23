"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, Aperture } from "lucide-react";

export function SimpleLayout({ children }: { children: React.ReactNode }) {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <nav
          data-state={menuState && 'active'}
          className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
          <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full items-center justify-between gap-12">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2">
                  <div className="text-primary">
                    <Aperture className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg">
                    Studio Phazant
                  </span>
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>

                <div className="hidden lg:block">
                  <ul className="flex gap-8 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>About</span>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="mailto:info@studiophazant.nl"
                        className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>Contact</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                <div className="lg:hidden">
                  <ul className="space-y-6 text-base">
                    <li>
                      <Link
                        href="/"
                        className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>About</span>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="mailto:info@studiophazant.nl"
                        className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>Contact</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="overflow-x-hidden pt-20 flex-1">
        {children}
      </main>

      <footer className="border-b bg-white pt-20 dark:bg-transparent">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mt-12 flex flex-wrap items-center gap-6 border-t py-6 flex-col md:flex-row md:justify-between">
            <div className="order-last flex justify-center md:order-first md:justify-start">
              <Link href="/" aria-label="go home" className="text-primary">
                <Aperture className="w-8 h-8" />
              </Link>
              <span className="self-center text-muted-foreground text-sm ml-2">© {new Date().getFullYear()} Studio Phazant, All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
