import React from 'react';
import { cn } from '@/lib/utils';

type MonogramSize = 'sm' | 'md' | 'lg' | 'xl';

const sizes: Record<MonogramSize, { bird: string; text: string }> = {
  sm: { bird: 'h-[15px]', text: 'h-7' },
  md: { bird: 'h-[21px]', text: 'h-9' },
  lg: { bird: 'h-[30px]', text: 'h-14' },
  xl: { bird: 'h-[60px]', text: 'h-28' },
};

export function Monogram({
  className,
  size = 'md',
  withBird = true,
  withText = true,
  color = '#55874a',
}: {
  className?: string;
  size?: MonogramSize;
  withBird?: boolean;
  withText?: boolean;
  color?: string;
}) {
  const s = sizes[size];
  return (
    <span className={cn('inline-flex flex-col items-center', className)}>
      {withBird && <span aria-hidden className={cn('block relative z-10 aspect-[6821/6385]', s.bird)} style={{backgroundColor: color, mask: 'url(/logo-new.svg) center / contain no-repeat', WebkitMask: 'url(/logo-new.svg) center / contain no-repeat'}} />}
      {withText && <img src='/logo-text.svg' alt='Studio Phazant' className={cn('block w-auto', s.text)} />}
    </span>
  );
}
