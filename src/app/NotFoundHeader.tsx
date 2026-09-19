'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import headerStyles from '@/components/Header/Header.module.css';

// A static, French-only header for the root 404 page. Reuses Header's CSS
// module for a matching look, but avoids importing the real Header
// component: it renders inside a <NextIntlClientProvider>, which itself
// pulls in next-intl's request config — and since this file sits at the
// app root, it's implicitly part of every route's render tree, so that
// would mark the entire site as dynamic instead of statically prerendered.
const NAV_LINKS = [
  { href: '/#features', label: 'Fonctionnalités' },
  { href: '/#screenshots', label: "Captures d'écran" },
  { href: '/#testimonials', label: 'Avis' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function NotFoundHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={headerStyles.header}>
        <div className="container">
          <div className={headerStyles.headerContent}>
            <Link href="/" className={headerStyles.logo}>
              <Image src="/images/logo.webp" alt="Noor Phonetic Quran Logo" width={42} height={42} priority />
              <span className={headerStyles.logoText}>Noor Phonetic Quran</span>
            </Link>

            <button
              className={headerStyles.menuToggle}
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navbar-404"
              onClick={() => setMobileMenuOpen(true)}
            >
              <i className="fas fa-bars" />
            </button>

            <nav className={headerStyles.navbar}>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div
        id="mobile-navbar-404"
        className={`${headerStyles.mobileNavbar} ${mobileMenuOpen ? headerStyles.active : ''}`}
      >
        <div className={headerStyles.mobileNavbarHeader}>
          <Link href="/" className={headerStyles.logo} onClick={closeMobileMenu}>
            <Image src="/images/logo.webp" alt="Noor Phonetic Quran Logo" width={42} height={42} />
            <span className={headerStyles.logoText}>Noor Phonetic Quran</span>
          </Link>
          <button
            className={headerStyles.closeMenu}
            aria-label="Fermer le menu de navigation"
            onClick={closeMobileMenu}
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <nav className={headerStyles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMobileMenu}>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
