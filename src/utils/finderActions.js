import { WINDOW_IDS } from '../config/windowIds.js';

/** @typedef {import('#types/models.js').LocationNode} LocationNode */
/** @typedef {import('#types/models.js').WindowId} WindowId */

const FILE_WINDOW_MAP = Object.freeze({
  txt: WINDOW_IDS.TEXT_FILE,
  img: WINDOW_IDS.IMAGE_FILE,
});

/**
 * @param {LocationNode} item
 * @returns {{
 * type: 'navigate-folder' | 'open-window' | 'open-link' | 'noop',
 * windowId?: WindowId,
 * href?: string,
 * payload?: LocationNode,
 * }}
 */
export const resolveFinderAction = (item) => {
  if (item.kind === 'folder') {
    return { type: 'navigate-folder', payload: item };
  }

  const fileType = item.fileType ?? '';
  if (fileType === 'pdf') {
    return { type: 'open-window', windowId: WINDOW_IDS.RESUME };
  }

  if ((fileType === 'fig' || fileType === 'url') && typeof item.href === 'string') {
    return { type: 'open-link', href: item.href };
  }

  const windowId = FILE_WINDOW_MAP[fileType];
  if (windowId) {
    return { type: 'open-window', windowId, payload: item };
  }

  return { type: 'noop' };
};
