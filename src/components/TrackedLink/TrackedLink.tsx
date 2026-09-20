'use client';

import { type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { trackEvent } from '@/lib/firebase';

interface TrackedLinkProps {
  href: string;
  eventName: string;
  params?: Record<string, string>;
  className?: string;
  children: ReactNode;
}

// Same idea as StoreLink: lets server-rendered pages track an internal
// navigation click (related-page links, cross-promo, etc.) without turning
// the whole section into a client component.
export default function TrackedLink({ href, eventName, params, className, children }: TrackedLinkProps) {
  return (
    <Link href={href} className={className} onClick={() => trackEvent(eventName, params)}>
      {children}
    </Link>
  );
}
