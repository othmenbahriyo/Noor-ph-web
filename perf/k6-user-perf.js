import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Simulates real-user browsing patterns on noor-phonetic-quran.com to
// measure page load performance (TTFB / full document time) across
// the busiest routes and a sample of locales.
//
// Usage:
//   k6 run perf/k6-user-perf.js
//   k6 run -e BASE_URL=https://noor-phonetic-quran.com perf/k6-user-perf.js
//   k6 run -e VUS=20 -e DURATION=2m perf/k6-user-perf.js

const BASE_URL = __ENV.BASE_URL || 'https://noor-phonetic-quran.com';

// A representative slice of locales rather than all 20, to keep load
// realistic while still exercising the [locale] dynamic segment.
const LOCALES = (__ENV.LOCALES || 'fr,en,ar,es').split(',');

const PAGES = [
  '', // homepage
  '/audio-coran',
  '/khatma-coran',
  '/quiz-coran',
  '/tajweed-coran',
  '/memorisation-coran',
  '/correction-recitation-coran',
  '/blog',
];

const homepageTrend = new Trend('homepage_duration', true);
const contentTrend = new Trend('content_page_duration', true);

export const options = {
  scenarios: {
    ramping_users: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: Number(__ENV.VUS) || 10 },
        { duration: __ENV.DURATION || '1m', target: Number(__ENV.VUS) || 10 },
        { duration: '20s', target: 0 },
      ],
      gracefulRampDown: '10s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1500', 'p(99)<3000'],
    http_req_failed: ['rate<0.01'],
    homepage_duration: ['p(95)<1200'],
    content_page_duration: ['p(95)<1800'],
  },
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function () {
  const locale = pickRandom(LOCALES);

  group('homepage', function () {
    const res = http.get(`${BASE_URL}/${locale}`, {
      tags: { name: 'homepage' },
    });
    homepageTrend.add(res.timings.duration);
    check(res, {
      'homepage status is 200': (r) => r.status === 200,
      'homepage loaded under 2s': (r) => r.timings.duration < 2000,
    });
  });

  sleep(Math.random() * 2 + 1); // think time: 1-3s

  const page = pickRandom(PAGES.filter((p) => p !== ''));
  group('content_page', function () {
    const res = http.get(`${BASE_URL}/${locale}${page}`, {
      tags: { name: 'content_page' },
    });
    contentTrend.add(res.timings.duration);
    check(res, {
      'content page status is 200': (r) => r.status === 200,
      'content page loaded under 3s': (r) => r.timings.duration < 3000,
    });
  });

  sleep(Math.random() * 3 + 1); // think time: 1-4s
}
