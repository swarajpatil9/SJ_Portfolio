import { env } from '#config/env.js';

/** @typedef {{ title: string, description: string, urlPath: string, image?: string, type?: string }} SeoPayload */

/** @param {string} selector @returns {HTMLMetaElement | null} */
const getMeta = (selector) => {
  if (typeof document === 'undefined') return null;
  return document.head.querySelector(selector);
};

/** @param {string} key @param {string} value @param {'name' | 'property'} kind */
const upsertMetaTag = (key, value, kind = 'name') => {
  if (typeof document === 'undefined') return;
  const selector = `meta[${kind}="${key}"]`;
  let tag = getMeta(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(kind, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', value);
};

/** @param {string} href */
const upsertCanonical = (href) => {
  if (typeof document === 'undefined') return;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

/** @param {SeoPayload} payload */
export const applySeoMeta = ({ title, description, urlPath, image, type = 'website' }) => {
  if (typeof document === 'undefined') return;

  const normalizedPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  const canonicalUrl = `${env.siteUrl}${normalizedPath}`;
  const ogImage = image ? `${env.siteUrl}${image}` : `${env.siteUrl}/images/wallpaper.png`;

  document.title = title;
  upsertCanonical(canonicalUrl);

  upsertMetaTag('description', description, 'name');
  upsertMetaTag('og:title', title, 'property');
  upsertMetaTag('og:description', description, 'property');
  upsertMetaTag('og:type', type, 'property');
  upsertMetaTag('og:url', canonicalUrl, 'property');
  upsertMetaTag('og:image', ogImage, 'property');

  upsertMetaTag('twitter:title', title, 'name');
  upsertMetaTag('twitter:description', description, 'name');
  upsertMetaTag('twitter:image', ogImage, 'name');
};
