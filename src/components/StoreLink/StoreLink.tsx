'use client';

import { type ReactNode } from 'react';
import { trackEvent } from '@/lib/firebase';

interface StoreLinkProps {
  href: string;
  store: 'googlePlay' | 'appStore';
  location: string;
  className?: string;
  children: ReactNode;
}

// Thin client wrapper so server-rendered hero/footer sections can still
// track store button clicks without becoming client components themselves.
export default function StoreLink({ href, store, location, className, children }: StoreLinkProps) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('store_click', { store, location })}
    >
      {children}
    </a>
  );
}
