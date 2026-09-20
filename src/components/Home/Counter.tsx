'use client';

import { useCounterAnimation } from '@/hooks/useCounterAnimation';

interface CounterProps {
  target: number;
  className?: string;
}

/**
 * Small client boundary around the `.counter` badge number so the rest of
 * the Hero section can stay a regular client component without needing to
 * duplicate the counting logic. Ports the `<span class="badge-number counter"
 * data-target="50000">0</span>` markup from the original hero.
 */
export default function Counter({ target, className }: CounterProps) {
  useCounterAnimation();

  return (
    <span className={`counter ${className ?? ''}`} data-target={target}>
      {target.toLocaleString()}
    </span>
  );
}
