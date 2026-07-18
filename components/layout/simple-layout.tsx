'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Monogram } from '@/components/portfolio/monogram';

const navLinks = [
  { label: 'work', href: '/work' },
  { label: 'about', href: '/about' },
  { label: 'contact', href: 'mailto:info@studiophazant.nl' },
];

function DesktopNavList({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <ul className='flex items-center gap-3 lg:gap-5 font-ui-sans text-[#ffe28a] text-[10px] lg:text-xs uppercase tracking-[0.22em]'>
      {items.map((item, i) => (
        <React.Fragment key={item.href}>
          {i > 0 && <li aria-hidden className='w-px h-3 bg-[#ffe28a]/70 self-center rotate-[20deg]' />}
          <li>
            <Link href={item.href} className='hover:opacity-70 transition-opacity'>
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
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='absolute inset-x-0 top-0 z-30 px-6 pt-5 text-[#ffe28a] md:pt-7'>
        {/* Mobile: hamburger left, logo right */}
        <div className='md:hidden flex items-center justify-between max-w-5xl mx-auto'>
          <button type='button' onClick={() => setMenuOpen(true)} aria-label='Open menu' aria-expanded={menuOpen} className='p-1 -ml-1'>
            <Menu className='h-6 w-6' />
          </button>
          <Link href='/' aria-label='Studio Phazant home' className='opacity-90'>
            <Monogram size='xl' withText={false} className='nav-logo-yellow' />
          </Link>
        </div>

        {/* Desktop: one centered logo + navigation row */}
        <nav className='hidden md:flex max-w-6xl mx-auto items-center justify-center gap-8'>
          <Link href='/' aria-label='Studio Phazant home' className='shrink-0 opacity-90'>
            <Monogram size='xl' withText={false} className='nav-logo-yellow' />
          </Link>
          <DesktopNavList items={navLinks} />
        </nav>
      </header>

      {/* Mobile fullscreen overlay menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
        role='dialog'
        aria-modal='true'
      >
        <div className='absolute top-6 right-6'>
          <button type='button' onClick={() => setMenuOpen(false)} aria-label='Close menu' className='text-[#4b7f4a] p-1'>
            <X className='h-6 w-6' />
          </button>
        </div>

        <div className='h-full flex flex-col items-center justify-center px-6'>
          <Link href='/' onClick={() => setMenuOpen(false)} aria-label='Studio Phazant home' className='mb-10'>
            <Monogram size='lg' withText={false} />
          </Link>
          <ul className='flex flex-col items-center gap-6 font-serif italic text-[#4b7f4a] text-3xl'>
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMenuOpen(false)} className='hover:opacity-70 transition-opacity'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <main className='flex-1'>{children}</main>
    </div>
  );
}
