import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createWindowId } from '../utils/validators.js';

import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants/index.js';

/** @typedef {import('#types/models.js').WindowId} WindowId */
/** @typedef {import('#types/models.js').LocationNode} LocationNode */
/** @typedef {import('#types/models.js').WindowConfig} WindowConfig */
/** @typedef {import('#types/models.js').WindowStore} WindowStore */

/** @returns {WindowConfig} */
const createInitialWindows = () =>
  /** @type {WindowConfig} */ (
    Object.fromEntries(Object.entries(WINDOW_CONFIG).map(([key, value]) => [key, { ...value }]))
  );

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<WindowStore>>} */
const useWindowStore = create(
  immer((set) => ({
    windows: createInitialWindows(),
    nextZIndex: INITIAL_Z_INDEX + 1,
    previewWindow: null,

    /** @param {WindowId | null} windowKey */
    setPreviewWindow: (windowKey) =>
      set((state) => {
        state.previewWindow = createWindowId(windowKey);
      }),

    /** @param {WindowId} windowKey @param {LocationNode | null=} data */
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const id = createWindowId(windowKey);
        if (!id) return;
        const window = state.windows[id];
        if (!window) return;
        window.isOpen = true;
        window.isMinimized = false;
        window.data = data ?? window.data;
        window.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),

    /** @param {WindowId} windowKey */
    closeWindow: (windowKey) =>
      set((state) => {
        const id = createWindowId(windowKey);
        if (!id) return;
        const window = state.windows[id];
        if (!window) return;
        window.isOpen = false;
        window.isMinimized = false;
        window.isMaximized = false;
        window.data = null;
        window.zIndex = INITIAL_Z_INDEX;
      }),

    /** @param {WindowId} windowKey */
    minimizeWindow: (windowKey) =>
      set((state) => {
        const id = createWindowId(windowKey);
        if (!id) return;
        const window = state.windows[id];
        if (!window) return;
        window.isMinimized = true;
      }),

    /** @param {WindowId} windowKey */
    unminimizeWindow: (windowKey) =>
      set((state) => {
        const id = createWindowId(windowKey);
        if (!id) return;
        const window = state.windows[id];
        if (!window) return;
        window.isMinimized = false;
        window.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),

    /** @param {WindowId} windowKey */
    maximizeWindow: (windowKey) =>
      set((state) => {
        const id = createWindowId(windowKey);
        if (!id) return;
        const window = state.windows[id];
        if (!window) return;
        window.isMaximized = !window.isMaximized;
      }),

    /** @param {WindowId} windowKey */
    focusWindow: (windowKey) =>
      set((state) => {
        const id = createWindowId(windowKey);
        if (!id) return;
        const window = state.windows[id];
        if (!window) return;
        window.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),
  }))
);

export default useWindowStore;
