'use client';

import { REOPEN_EVENT } from './CookieConsent';

export default function CookieSettingsLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event(REOPEN_EVENT));
      }}
    >
      {label}
    </a>
  );
}
