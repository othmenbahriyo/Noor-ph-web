# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Noor Phonetic Quran is a static HTML landing page for a mobile app that teaches Quranic recitation using phonetic transcription. The site promotes iOS and Android apps and is hosted at `noor-phonetic-quran.com`.

## Development

**No build system** - this is a pure static HTML/CSS/JS website.

- Edit files directly (`index.html`, `cgu.html`)
- Open in browser to test (no build step required)
- All styles and scripts are inline in `index.html`

## Architecture

### File Structure
- `index.html` - Main landing page (single 4400+ line file with embedded CSS and JS)
- `cgu.html` - Terms and conditions page
- `images/` - Static image assets (logo, screenshots, app images)
- `robots.txt`, `sitemap.xml` - SEO configuration

### Technology Stack
- HTML5, CSS3, Vanilla JavaScript
- Font Awesome 6.4.0 (via CDN)
- No frameworks or build tools

### Bilingual Content System
Content is duplicated in French and English using lang attributes:
```html
<span lang="fr">Texte français</span>
<span lang="en">English text</span>
```
The `switchLanguage(lang)` JavaScript function toggles visibility and persists selection to localStorage.

### CSS Variables (defined in `:root`)
- `--primary-color: #00553d` (green)
- `--accent-color: #dabc4c` (gold)
- `--transition: all 0.3s ease`

### Key JavaScript Functions
- `switchLanguage(lang)` - Language switching with localStorage persistence
- `animateCounters()` - Number counter animations
- `animateHeroElements()` - Hero section entrance animations
- `setupParallaxEffect()` - Parallax scrolling effect
- Testimonial carousel with touch/swipe support

### Responsive Breakpoints
- Mobile: `max-width: 991px`
- Landscape detection adjusts device container sizing

## External Links
- Google Play: `com.coran.noor.bhr`
- App Store: `id6737744800`
