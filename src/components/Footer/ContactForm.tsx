'use client';

import { useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, trackEvent } from '@/lib/firebase';
import Dropdown from '@/components/Dropdown/Dropdown';
import styles from './ContactForm.module.css';

const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const SUBJECT_OPTIONS = [
  { value: 'general', icon: 'fas fa-circle-question' },
  { value: 'suggestion', icon: 'fas fa-lightbulb' },
  { value: 'bug', icon: 'fas fa-bug' },
  { value: 'technical', icon: 'fas fa-screwdriver-wrench' },
  { value: 'other', icon: 'fas fa-ellipsis' },
] as const;

const PLATFORM_OPTIONS = [
  { value: 'ios', icon: 'fab fa-apple' },
  { value: 'android', icon: 'fab fa-android' },
  { value: 'web', icon: 'fas fa-globe' },
] as const;

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  platform?: string;
  message?: string;
}

export default function ContactForm() {
  const t = useTranslations('common.contactForm');
  const locale = useLocale();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [platform, setPlatform] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!name.trim()) nextErrors.name = t('nameRequired');

    if (!email.trim()) {
      nextErrors.email = t('emailRequired');
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = t('emailInvalid');
    }

    if (!subject) nextErrors.subject = t('subjectRequired');
    if (!platform) nextErrors.platform = t('platformRequired');

    if (!message.trim()) {
      nextErrors.message = t('messageRequired');
    } else if (message.trim().length < 10) {
      nextErrors.message = t('messageTooShort');
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'contact_messages'), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        subject,
        platform,
        message: message.trim(),
        timestamp: serverTimestamp(),
        source: 'web',
        language: locale,
        app_title: 'Noor Phonetic Quran',
      });

      setStatus('success');
      trackEvent('contact_form_submit', { subject });
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setPlatform('');
      setMessage('');
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-name">
          {t('name')}
        </label>
        <input
          id="contact-name"
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('namePlaceholder')}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-email">
            {t('email')}
          </label>
          <input
            id="contact-email"
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-phone">
            {t('phone')}
          </label>
          <input
            id="contact-phone"
            className={styles.input}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('phonePlaceholder')}
          />
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} id="contact-subject-label" htmlFor="contact-subject">
            {t('subject')}
          </label>
          <Dropdown
            id="contact-subject"
            labelledBy="contact-subject-label"
            value={subject}
            onChange={setSubject}
            placeholder={t('subjectPlaceholder')}
            invalid={Boolean(errors.subject)}
            options={SUBJECT_OPTIONS.map((option) => ({
              value: option.value,
              icon: option.icon,
              label: t(`subjectOptions.${option.value}`),
            }))}
          />
          {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} id="contact-platform-label" htmlFor="contact-platform">
            {t('platform')}
          </label>
          <Dropdown
            id="contact-platform"
            labelledBy="contact-platform-label"
            value={platform}
            onChange={setPlatform}
            placeholder={t('platformPlaceholder')}
            invalid={Boolean(errors.platform)}
            options={PLATFORM_OPTIONS.map((option) => ({
              value: option.value,
              icon: option.icon,
              label: t(`platformOptions.${option.value}`),
            }))}
          />
          {errors.platform && <span className={styles.errorText}>{errors.platform}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          {t('message')}
        </label>
        <textarea
          id="contact-message"
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
      </div>

      <button className={styles.submitBtn} type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <span className={styles.spinner} />
            {t('sending')}
          </>
        ) : (
          <>
            <i className="fas fa-paper-plane" />
            {t('send')}
          </>
        )}
      </button>

      {status === 'success' && (
        <p className={`${styles.statusMessage} ${styles.statusSuccess}`} role="status">
          {t('successMessage')}
        </p>
      )}
      {status === 'error' && (
        <p className={`${styles.statusMessage} ${styles.statusError}`} role="alert">
          {t('errorMessage')}
        </p>
      )}
    </form>
  );
}
