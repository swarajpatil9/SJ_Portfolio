import useWindowStore from './window.jsx';

import { isValidWindowId } from '../utils/validation.js';

/** @typedef {import('#types/models.js').WindowId} WindowId */
/** @typedef {import('#types/models.js').WindowState} WindowState */

/**
 * @param {WindowId} windowId
 * @returns {WindowState | null}
 */
export const useWindow = (windowId) => {
  return useWindowStore((state) => {
    if (!isValidWindowId(windowId)) return null;
    return state.windows[windowId] ?? null;
  });
};

/**
 * @returns {{ id: WindowId, state: WindowState } | null}
 */
export const useActiveWindow = () => {
  return useWindowStore((state) => {
    /** @type {{ id: WindowId, state: WindowState } | null} */
    let active = null;

    for (const [id, value] of Object.entries(state.windows)) {
      if (!value.isOpen || value.isMinimized) continue;
      if (!active || value.zIndex > active.state.zIndex) {
        active = { id: /** @type {WindowId} */ (id), state: value };
      }
    }

    return active;
  });
};

/**
 * @returns {{
 * windows: import('#types/models.js').WindowConfig,
 * previewWindow: WindowId | null,
 * openWindow: import('#types/models.js').WindowActions['openWindow'],
 * minimizeWindow: import('#types/models.js').WindowActions['minimizeWindow'],
 * unminimizeWindow: import('#types/models.js').WindowActions['unminimizeWindow'],
 * setPreviewWindow: import('#types/models.js').WindowActions['setPreviewWindow']
 * }}
 */
export const useDockState = () => {
  return useWindowStore((state) => ({
    windows: state.windows,
    previewWindow: state.previewWindow,
    openWindow: state.openWindow,
    minimizeWindow: state.minimizeWindow,
    unminimizeWindow: state.unminimizeWindow,
    setPreviewWindow: state.setPreviewWindow,
  }));
};
