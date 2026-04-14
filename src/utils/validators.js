import { APP_ROUTES } from '../config/routes.js';
import { blogData } from '#constants/blogData.js';
import { WINDOW_CONFIG } from '#constants/index.js';

/** @typedef {import('#types/models.js').WindowId} WindowId */

/**
 * @param {unknown} id
 * @returns {WindowId | null}
 */
export const createWindowId = (id) => {
  if (typeof id !== 'string') return null;
  return Object.prototype.hasOwnProperty.call(WINDOW_CONFIG, id)
    ? /** @type {WindowId} */ (id)
    : null;
};

/**
 * @param {unknown} value
 * @returns {value is WindowId}
 */
export const isValidWindowId = (value) => createWindowId(value) !== null;

/**
 * @param {unknown} value
 * @returns {value is import('#types/models.js').AppRoutes[keyof import('#types/models.js').AppRoutes]}
 */
export const isValidRoute = (value) =>
  typeof value === 'string' &&
  Object.values(APP_ROUTES).includes(/** @type {'/' | '/blog/:slug'} */ (value));

/**
 * @param {unknown} slug
 * @returns {slug is keyof typeof blogData}
 */
export const isValidBlogSlug = (slug) =>
  typeof slug === 'string' && Object.prototype.hasOwnProperty.call(blogData, slug);
