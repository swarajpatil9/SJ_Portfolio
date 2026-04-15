import { env } from '#config/env.js';

/** @typedef {{ name: string, value: number, rating?: 'good' | 'needs-improvement' | 'poor' }} Metric */

const reportMetric = (metric) => {
  if (import.meta.env.DEV) {
    console.warn('[web-vitals]', metric.name, metric.value);
  }

  // Placeholder for analytics integrations (e.g. GA4, PostHog, Segment)
  if (env.analyticsId) {
    window.dispatchEvent(new CustomEvent('analytics:web-vital', { detail: metric }));
  }
};

export const initWebVitals = () => {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return;

  try {
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportMetric({ name: 'FCP', value: entry.startTime });
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });

    const largestPaintObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const last = entries.at(-1);
      if (last) {
        reportMetric({ name: 'LCP', value: last.startTime });
      }
    });
    largestPaintObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Web vitals observer unavailable', error);
    }
  }
};

/** @param {string} path */
export const trackPageView = (path) => {
  if (import.meta.env.DEV) {
    console.warn('[analytics] pageview', path);
  }

  if (!env.analyticsId) return;

  window.dispatchEvent(
    new CustomEvent('analytics:pageview', {
      detail: {
        analyticsId: env.analyticsId,
        path,
        timestamp: Date.now(),
      },
    })
  );
};
