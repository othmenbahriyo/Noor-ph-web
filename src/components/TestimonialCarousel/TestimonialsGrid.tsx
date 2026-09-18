import { Link } from '@/i18n/navigation';
import styles from './TestimonialsGrid.module.css';

export interface Testimonial {
  /** Initials shown in the round avatar, e.g. "OA" */
  initials: string;
  name: string;
  device: string;
  text: string;
  /** Star rating out of 5, defaults to 5 */
  rating?: number;
}

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  viewAllLabel?: string;
}

const VISIBLE_COUNT = 8;

export default function TestimonialsGrid({
  testimonials,
  viewAllLabel = 'See all reviews',
}: TestimonialsGridProps) {
  if (testimonials.length === 0) return null;

  const visibleTestimonials = testimonials.slice(0, VISIBLE_COUNT);

  return (
    <div className={styles.wrapper}>
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
                <h4>{testimonial.name}</h4>
                <p>{testimonial.device}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.viewAllWrap}>
        <Link href="/avis" className={styles.viewAllBtn}>
          {viewAllLabel}
          <i className="fas fa-arrow-right" />
        </Link>
      </div>
    </div>
  );
}
