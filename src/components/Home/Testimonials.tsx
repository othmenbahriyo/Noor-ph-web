import { getTranslations } from 'next-intl/server';
import TestimonialsGrid, { type Testimonial } from '@/components/TestimonialCarousel/TestimonialsGrid';
import styles from './Testimonials.module.css';

export default async function Testimonials() {
  const t = await getTranslations('home.testimonials');
  const items = t.raw('items') as Testimonial[];

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <TestimonialsGrid testimonials={items} viewAllLabel={t('viewAllLabel')} />
      </div>
    </section>
  );
}
