'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageModal from '@/components/LanguageModal/LanguageModal';
import SearchModal from './SearchModal';
import { LANGUAGES } from '@/i18n/languages';
import type { BlogPostMeta } from '@/lib/blog';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

interface NavLink {
  href: string;
  key: 'features' | 'screenshots' | 'reviews' | 'blog' | 'aboutUs' | 'contact';
  icon: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '#features', key: 'features', icon: 'fa-star' },
  { href: '#screenshots', key: 'screenshots', icon: 'fa-mobile-alt' },
  { href: '#testimonials', key: 'reviews', icon: 'fa-comment' },
  { href: '/blog', key: 'blog', icon: 'fa-book-open' },
  { href: '/notre-histoire', key: 'aboutUs', icon: 'fa-heart' },
  { href: '/contact', key: 'contact', icon: 'fa-envelope' },
];

const STORE_LINKS = [
  {
    href: 'https://play.google.com/store/apps/details?id=coran.noor.bhr',
    labelKey: 'googlePlay' as const,
    icon: 'fab fa-google-play',
  },
  {
    href: 'https://apps.apple.com/app/noor-phonetic-quran/id6737744800',
    labelKey: 'appStore' as const,
    icon: 'fab fa-apple',
  },
];

interface HeaderClientProps {
  recentPosts: BlogPostMeta[];
}

export default function HeaderClient({ recentPosts }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const locale = useLocale();
  const pathname = usePathname();
  const tNav = useTranslations('common.nav');
  const tLang = useTranslations('common.languageSwitcher');
  const tSearch = useTranslations('common.search');

  const currentLanguage = LANGUAGES.find((lang) => lang.code === locale);

  // Section anchors (#features, #screenshots, #testimonials) only exist on
  // the homepage. From any other page, prefix with "/" so the browser
  // navigates there first instead of silently no-op'ing on a missing id.
  const isHome = pathname === '/';
  const resolveHref = (href: string) => (href.startsWith('#') && !isHome ? `/${href}` : href);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              <Image src="/images/logo.webp" alt="Noor Phonetic Quran Logo" width={42} height={42} priority />
              <span className={styles.logoText}>Noor Phonetic Quran</span>
            </Link>

            <button
              className={styles.menuToggle}
              aria-label={tNav('openMenu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navbar"
              onClick={() => setMobileMenuOpen(true)}
            >
              <i className="fas fa-bars" />
            </button>

            <nav className={styles.navbar}>
              {NAV_LINKS.map((link) =>
                link.href.startsWith('#') ? (
                  <a key={link.href} href={resolveHref(link.href)}>
                    {tNav(link.key)}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href}>
                    {tNav(link.key)}
                  </Link>
                ),
              )}
            </nav>

            <div className={styles.headerActions}>
              <button
                className={styles.searchBtn}
                aria-label={tSearch('label')}
                onClick={() => setSearchModalOpen(true)}
              >
                <i className="fas fa-search" />
              </button>
              <ThemeToggle label={tNav('toggleTheme')} className={styles.desktopThemeToggle} />
              <button className={styles.langBtn} onClick={() => setLangModalOpen(true)}>
                <span className={styles.langFlag}>{currentLanguage?.flag}</span>
                <span className={styles.currentLang}>{locale.toUpperCase()}</span>
                <i className="fas fa-chevron-down" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {langModalOpen && <LanguageModal onClose={() => setLangModalOpen(false)} />}
      {searchModalOpen && <SearchModal onClose={() => setSearchModalOpen(false)} recentPosts={recentPosts} />}

      {/* Mobile Navbar */}
      <div id="mobile-navbar" className={`${styles.mobileNavbar} ${mobileMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileNavbarHeader}>
          <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
            <Image src="/images/logo.webp" alt="Noor Phonetic Quran Logo" width={42} height={42} />
            <span className={styles.logoText}>Noor Phonetic Quran</span>
          </Link>
          <button className={styles.closeMenu} aria-label={tNav('closeMenu')} onClick={closeMobileMenu}>
            <i className="fas fa-times" />
          </button>
        </div>
        <button
          className={styles.mobileSearchBtn}
          onClick={() => {
            closeMobileMenu();
            setSearchModalOpen(true);
          }}
        >
          <i className="fas fa-search" />
          <span>{tSearch('placeholder')}</span>
        </button>
        <nav className={styles.mobileMenu}>
          {NAV_LINKS.map((link) =>
            link.href.startsWith('#') ? (
              <a key={link.href} href={resolveHref(link.href)} onClick={closeMobileMenu}>
                <i className={`fas ${link.icon}`} />
                <span>{tNav(link.key)}</span>
              </a>
            ) : (
              <Link key={link.href} href={link.href} onClick={closeMobileMenu}>
                <i className={`fas ${link.icon}`} />
                <span>{tNav(link.key)}</span>
              </Link>
            ),
          )}
          {STORE_LINKS.map((store) => (
            <a key={store.href} href={store.href} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
              <i className={store.icon} />
              <span>{tNav(store.labelKey)}</span>
            </a>
          ))}
        </nav>
        <div className={styles.mobileBottomRow}>
          <button
            className={styles.mobileLangSwitcher}
            onClick={() => {
              closeMobileMenu();
              setLangModalOpen(true);
            }}
          >
            <span className={styles.langFlag}>{currentLanguage?.flag}</span>
            <span>{tLang('label')}</span>
            <i className="fas fa-chevron-right" />
          </button>
          <ThemeToggle label={tNav('toggleTheme')} />
        </div>
      </div>
    </>
  );
}
