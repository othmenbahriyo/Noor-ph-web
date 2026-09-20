'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { BlogPostMeta } from '@/lib/blog';
import blogStyles from '../Blog/Blog.module.css';
import styles from './BlogPreview.module.css';

interface BlogCarouselProps {
  posts: BlogPostMeta[];
  readMoreLabel: string;
}

// Tracks which card is centered in the mobile scroll-snap carousel so the
// dot indicator below it can reflect the active slide (desktop ignores this
// via CSS and shows the plain grid instead).
export default function BlogCarousel({ posts, readMoreLabel }: BlogCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((best, entry) =>
          entry.intersectionRatio > (best?.intersectionRatio ?? 0) ? entry : best,
        entries[0]);
        if (mostVisible?.isIntersecting) {
          const index = cardRefs.current.findIndex((el) => el === mostVisible.target);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { root: track, threshold: [0.5, 0.75, 1] },
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const goToIndex = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <>
      <div ref={trackRef} className={`${blogStyles.grid} ${styles.carousel}`}>
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={blogStyles.card}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
          >
            <div className={blogStyles.cardImage}>
              <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 400px" />
            </div>
            <div className={blogStyles.cardBody}>
              <span className={blogStyles.cardCategory}>{post.category}</span>
              <h3 className={blogStyles.cardTitle}>{post.title}</h3>
              <p className={blogStyles.cardDescription}>{post.description}</p>
              <div className={blogStyles.cardFooter}>
                <span className={blogStyles.cardDate}>{post.date}</span>
                <span className={blogStyles.cardReadMore}>
                  {readMoreLabel}
                  <i className="fas fa-arrow-right" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.indicators}>
        {posts.map((post, index) => (
          <button
            key={post.slug}
            type="button"
            className={`${styles.indicatorDot} ${index === activeIndex ? styles.indicatorDotActive : ''}`}
            aria-label={`${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </>
  );
}
