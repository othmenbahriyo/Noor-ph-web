import type { ReactNode } from 'react';

// The real <html>/<body> shell lives in `app/[locale]/layout.tsx` (the
// standard next-intl App Router pattern), since the locale must be known
// to set `<html lang>` and to provide translated messages. This root
// layout only exists because Next.js requires one at `app/`.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
