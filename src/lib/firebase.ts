import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { isSupported, getAnalytics, logEvent, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Analytics pulls in gtag.js and sets cookies, so it must only start after
// the visitor has accepted the cookie banner — never load it eagerly at
// import time like `db` above. CookieConsent.tsx is the only caller.
let analyticsInstance: Analytics | null = null;

let analyticsReady: Promise<void> | null = null;

export function enableAnalytics(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (!analyticsReady) {
    analyticsReady = isSupported().then((supported) => {
      if (supported) {
        analyticsInstance = getAnalytics(app);
      } else {
        console.warn('[analytics] Firebase Analytics not supported in this browser');
      }
    });
  }
  return analyticsReady;
}

// Waits for enableAnalytics() to finish resolving before logging — fixes a
// race where a click fired trackEvent() before the isSupported() check
// (awaited inside enableAnalytics) had resolved, silently dropping the
// event because analyticsInstance was still null at call time.
export async function trackEvent(eventName: string, params?: Record<string, string>) {
  if (!analyticsReady) return;
  await analyticsReady;
  if (!analyticsInstance) return;
  logEvent(analyticsInstance, eventName, params);
}
