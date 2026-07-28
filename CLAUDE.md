# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Noor Phonetic Quran is a static HTML landing page for a mobile app that teaches Quranic recitation using phonetic transcription. The site promotes iOS and Android apps and is hosted at `noor-phonetic-quran.com`.

## Development

**No build system** - this is a pure static HTML/CSS/JS website.

- Edit files directly
- Open in browser to test (no build step required)
- All styles and scripts are inline in HTML files

## Architecture

### File Structure
- `index.html` - French landing page (default)
- `en/index.html` - English landing page
- `cgu.html` - Terms and conditions page (French)
- `images/` - Static image assets (logo, screenshots, app images)
- `robots.txt`, `sitemap.xml` - SEO configuration

### Multilingual SEO Structure
The site uses **separate URLs for each language** (best practice for SEO):
- French (default): `https://noor-phonetic-quran.com/`
- English: `https://noor-phonetic-quran.com/en/`

Each page has proper `hreflang` tags pointing to both versions:
```html
<link rel="alternate" hreflang="fr" href="https://noor-phonetic-quran.com/" />
<link rel="alternate" hreflang="en" href="https://noor-phonetic-quran.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://noor-phonetic-quran.com/" />
```

**Important**: When updating content, update BOTH language versions.

### Technology Stack
- HTML5, CSS3, Vanilla JavaScript
- Font Awesome 6.4.0 (via CDN)
- No frameworks or build tools

### CSS Variables (defined in `:root`)
- `--primary-color: #00553d` (green)
- `--accent-color: #dabc4c` (gold)
- `--transition: all 0.3s ease`

### Key JavaScript Functions
- `animateCounters()` - Number counter animations
- `animateHeroElements()` - Hero section entrance animations
- `setupParallaxEffect()` - Parallax scrolling effect
- Testimonial carousel with touch/swipe support

### Responsive Breakpoints
- Mobile: `max-width: 991px`
- Landscape detection adjusts device container sizing

### Image Paths
- French version (`index.html`): `src="images/..."`
- English version (`en/index.html`): `src="../images/..."`

## External Links
- Google Play: `com.coran.noor.bhr`
- App Store: `id6737744800`
