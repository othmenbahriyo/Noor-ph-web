'use client';

import dynamic from 'next/dynamic';
import styles from './ContactSection.module.css';

// Keeps the Firebase/Firestore SDK (used only on submit) out of the main
// bundle — it loads in its own chunk only when this section is rendered
// client-side, instead of shipping to every visitor on every page.
const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false,
  loading: () => <div className={styles.formSkeleton} />,
});

export default function ContactFormLoader() {
  return <ContactForm />;
}
