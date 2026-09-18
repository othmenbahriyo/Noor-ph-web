'use client';

import { useEffect } from 'react';

const FADE_IN_SELECTORS = [
  '.status-badge',
  '.headline-modern',
  '.subheadline-modern',
  '.mini-features',
  '.rating-card',
  '.download-btns-modern',
];

/**
 * Ports the original `animateHeroElements()` behaviour: staggers the
 * entrance animation of the hero's text block, rating stars, 3D device
 * mockup and floating badges on mount.
 */
export function useHeroAnimation() {
  useEffect(() => {
    FADE_IN_SELECTORS.forEach((selector, index) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return;

      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.transitionDelay = `${index * 0.15}s`;

      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100);
    });

    const stars = document.querySelectorAll<HTMLElement>('.rating-stars i');
    stars.forEach((star, index) => {
      star.style.opacity = '0';
      star.style.transform = 'scale(0)';
      star.style.transition = 'all 0.3s ease';
      star.style.transitionDelay = `${0.8 + index * 0.1}s`;

      setTimeout(() => {
        star.style.opacity = '1';
        star.style.transform = 'scale(1)';
      }, 100);
    });

    const device = document.querySelector<HTMLElement>('.device-3d');
    if (device) {
      device.style.opacity = '0';
      device.style.transform = 'rotateY(-15deg) rotateX(10deg) translateY(50px)';
      device.style.transition = 'all 0.8s ease-out';
      device.style.transitionDelay = '0.3s';

      setTimeout(() => {
        device.style.opacity = '1';
        device.style.transform = 'rotateY(-15deg) rotateX(10deg) translateY(0)';
      }, 100);
    }

    const badges = document.querySelectorAll<HTMLElement>('.floating-badge');
    badges.forEach((badge, index) => {
      badge.style.opacity = '0';
      badge.style.transform = 'scale(0.8)';
      badge.style.transition = 'all 0.5s ease';
      badge.style.transitionDelay = `${1 + index * 0.2}s`;

      setTimeout(() => {
        badge.style.opacity = '1';
        badge.style.transform = 'scale(1)';
      }, 100);
    });
  }, []);
}
