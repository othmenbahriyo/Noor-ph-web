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

export async function enableAnalytics() {
  if (analyticsInstance || typeof window === 'undefined') return;
  if (!(await isSupported())) return;
  analyticsInstance = getAnalytics(app);
}

// Silently no-ops when analytics hasn't been enabled (consent declined or
// not yet granted) — callers don't need to check enableAnalytics() state
// themselves before firing an event.
export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (!analyticsInstance) return;
  logEvent(analyticsInstance, eventName, params);
}
