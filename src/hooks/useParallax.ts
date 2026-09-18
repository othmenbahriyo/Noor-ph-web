'use client';

import { useEffect } from 'react';

/**
 * Ports the original `setupParallaxEffect()` behaviour: tilts the 3D device
 * mockup based on mouse position within its container, and applies a light
 * scroll-based parallax to the hero's background circles.
 */
export function useParallax() {
  useEffect(() => {
    const device = document.querySelector<HTMLElement>('.device-3d');
    const deviceContainer = document.querySelector<HTMLElement>('.device-showcase');

    const handleMouseMove = (e: MouseEvent) => {
      if (!device || !deviceContainer) return;
      const rect = deviceContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width - 0.5) * 2;
      const yPercent = (y / rect.height - 0.5) * 2;

      device.style.transform = `
        rotateY(${-15 + xPercent * 5}deg)
        rotateX(${10 - yPercent * 5}deg)
        translateZ(0)
      `;
    };

    const handleMouseLeave = () => {
      if (!device) return;
      device.style.transform = 'rotateY(-15deg) rotateX(10deg)';
      device.style.transition = 'transform 0.5s ease';
    };

    const handleMouseEnter = () => {
      if (!device) return;
      device.style.transition = 'none';
    };

    if (device && deviceContainer) {
      deviceContainer.addEventListener('mousemove', handleMouseMove);
      deviceContainer.addEventListener('mouseleave', handleMouseLeave);
      deviceContainer.addEventListener('mouseenter', handleMouseEnter);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroSection = document.querySelector<HTMLElement>('.hero-modern');
      const circles = document.querySelectorAll<HTMLElement>('.bg-circle');

      if (heroSection && circles.length && scrollPosition < window.innerHeight) {
        circles.forEach((circle, index) => {
          const speed = 0.05 + index * 0.02;
          circle.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (device && deviceContainer) {
        deviceContainer.removeEventListener('mousemove', handleMouseMove);
        deviceContainer.removeEventListener('mouseleave', handleMouseLeave);
        deviceContainer.removeEventListener('mouseenter', handleMouseEnter);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
