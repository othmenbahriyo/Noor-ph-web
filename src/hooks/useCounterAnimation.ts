'use client';

import { useEffect } from 'react';

/**
 * Ports the original `animateCounters()` behaviour: every element with the
 * `.counter` class and a `data-target` attribute counts up from 0 to its
 * target value once it scrolls into view.
 */
export function useCounterAnimation() {
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('.counter');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const counter = entry.target as HTMLElement;
          const target = Number(counter.getAttribute('data-target')) || 0;
          const duration = 2500;
          const increment = target / (duration / 15);
          let currentCount = 0;

          const updateCounter = () => {
            currentCount += increment;

            if (currentCount < target) {
              counter.textContent = Math.ceil(currentCount).toLocaleString();
              setTimeout(updateCounter, 15);
            } else {
              counter.textContent = target.toLocaleString();
            }
          };

          setTimeout(updateCounter, 1000);
          observer.unobserve(counter);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, []);
}
