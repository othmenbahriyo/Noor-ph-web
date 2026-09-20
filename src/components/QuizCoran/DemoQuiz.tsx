'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './DemoQuiz.module.css';

interface Question {
  question: string;
  answers: string[];
  correctIndex: number;
}

export default function DemoQuiz() {
  const t = useTranslations('quizCoran.demo');
  const questions = t.raw('questions') as Question[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelected(null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <span className={styles.eyebrow}>{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>

          {!finished ? (
            <>
              <div className={styles.progress}>
                <span>{t('progressLabel').replace('%CURRENT%', String(currentIndex + 1)).replace('%TOTAL%', String(questions.length))}</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <p className={styles.question}>{currentQuestion.question}</p>

              <div className={styles.answers}>
                {currentQuestion.answers.map((answer, index) => {
                  let variant = '';
                  if (selected !== null) {
                    if (index === currentQuestion.correctIndex) variant = styles.correct;
                    else if (index === selected) variant = styles.wrong;
                  }
                  return (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.answerBtn} ${variant}`}
                      onClick={() => handleAnswer(index)}
                      disabled={selected !== null}
                    >
                      <span className={styles.answerLetter}>{String.fromCharCode(65 + index)}</span>
                      {answer}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <button type="button" className={styles.nextBtn} onClick={handleNext}>
                  {isLast ? t('seeResults') : t('nextQuestion')}
                  <i className="fas fa-arrow-right" />
                </button>
              )}
            </>
          ) : (
            <div className={styles.resultScreen}>
              <div className={styles.resultScore}>
                {score}/{questions.length}
              </div>
              <p className={styles.resultLabel}>{t('resultLabel')}</p>

              <div className={styles.ctaGroup}>
                <button type="button" className={styles.restartBtn} onClick={handleRestart}>
                  <i className="fas fa-sync-alt" />
                  {t('restart')}
                </button>
                <a
                  href="https://play.google.com/store/apps/details?id=coran.noor.bhr"
                  className={styles.ctaBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-google-play" />
                  {t('cta')}
                </a>
                <a
                  href="https://apps.apple.com/app/noor-phonetic-quran/id6737744800"
                  className={styles.ctaBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-apple" />
                  {t('cta')}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
