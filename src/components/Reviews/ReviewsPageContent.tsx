'use client';

import { useState } from 'react';
import type { Testimonial } from '@/components/TestimonialCarousel/TestimonialsGrid';
import { trackEvent } from '@/lib/firebase';
import styles from './ReviewsPageContent.module.css';

interface ReviewsPageContentProps {
  testimonials: Testimonial[];
  eyebrow: string;
  title: string;
  subtitle: string;
  ratingCountLabel: string;
  loadMoreLabel: string;
}

const PAGE_SIZE = 24;

export default function ReviewsPageContent({
  testimonials,
  eyebrow,
  title,
  subtitle,
  ratingCountLabel,
  loadMoreLabel,
}: ReviewsPageContentProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const averageRating =
    testimonials.reduce((sum, item) => sum + (item.rating ?? 5), 0) / (testimonials.length || 1);

  const visibleTestimonials = testimonials.slice(0, visibleCount);
  const hasMore = visibleCount < testimonials.length;

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>
            <i className="fas fa-comment-dots" /> {eyebrow}
          </span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          <div className={styles.ratingSummary}>
            <span className={styles.ratingScore}>{averageRating.toFixed(1)}</span>
            <div>
              <div className={styles.ratingStars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <i className="fas fa-star" key={i} />
                ))}
              </div>
              <span className={styles.ratingCount}>
                {ratingCountLabel.replace('%COUNT%', String(testimonials.length))}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {visibleTestimonials.map((testimonial, index) => (
              <div className={styles.card} key={`${testimonial.name}-${index}`}>
                <div className={styles.stars}>
                  {Array.from({ length: testimonial.rating ?? 5 }).map((_, starIndex) => (
                    <i className="fas fa-star" key={starIndex} />
                  ))}
                </div>
                <p className={styles.text}>&ldquo;{testimonial.text}&rdquo;</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>{testimonial.initials}</div>
                  <div className={styles.authorInfo}>
                    <h5>{testimonial.name}</h5>
                    <p>{testimonial.device}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button
                className={styles.loadMoreBtn}
                onClick={() => {
                  const next = visibleCount + PAGE_SIZE;
                  setVisibleCount(next);
                  trackEvent('reviews_load_more', { visibleCount: String(Math.min(next, testimonials.length)) });
                }}
              >
                {loadMoreLabel}
                <i className="fas fa-chevron-down" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
