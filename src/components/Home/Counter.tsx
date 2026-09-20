'use client';

import { useLocale } from 'next-intl';

interface CounterProps {
  target: number;
  className?: string;
}

export default function Counter({ target, className }: CounterProps) {
  const locale = useLocale();

  return <span className={className}>+{target.toLocaleString(locale)}</span>;
}
