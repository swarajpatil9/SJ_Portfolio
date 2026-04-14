/** @typedef {import('#types/models.js').WindowId} WindowId */

/** @type {{
 * TERMINAL: Extract<WindowId, 'terminal'>,
 * SAFARI: Extract<WindowId, 'safari'>,
 * RESUME: Extract<WindowId, 'resume'>,
 * FINDER: Extract<WindowId, 'finder'>,
 * TEXT_FILE: Extract<WindowId, 'txtfile'>,
 * IMAGE_FILE: Extract<WindowId, 'imgfile'>,
 * CONTACT: Extract<WindowId, 'contact'>,
 * }} */
export const WINDOW_IDS = {
  TERMINAL: 'terminal',
  SAFARI: 'safari',
  RESUME: 'resume',
  FINDER: 'finder',
  TEXT_FILE: 'txtfile',
  IMAGE_FILE: 'imgfile',
  CONTACT: 'contact',
};
