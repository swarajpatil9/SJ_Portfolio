import { beforeEach, describe, expect, it } from 'vitest';

import useWindowStore from './window.jsx';

import { WINDOW_IDS } from '#config/windowIds.js';
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants/index.js';

/** @typedef {import('#types/models.js').WindowConfig} WindowConfig */

const resetWindowStore = () => {
  const windows = Object.fromEntries(
    Object.entries(WINDOW_CONFIG).map(([key, value]) => [key, { ...value }])
  );
  useWindowStore.setState({
    windows: /** @type {WindowConfig} */ (windows),
    nextZIndex: INITIAL_Z_INDEX + 1,
    previewWindow: null,
  });
};

describe('window store lifecycle', () => {
  beforeEach(() => {
    resetWindowStore();
  });

  it('opens, minimizes, restores and closes a window safely', () => {
    const store = useWindowStore.getState();

    store.openWindow(WINDOW_IDS.TERMINAL);
    expect(useWindowStore.getState().windows.terminal.isOpen).toBe(true);

    store.minimizeWindow(WINDOW_IDS.TERMINAL);
    expect(useWindowStore.getState().windows.terminal.isMinimized).toBe(true);

    store.unminimizeWindow(WINDOW_IDS.TERMINAL);
    expect(useWindowStore.getState().windows.terminal.isMinimized).toBe(false);

    store.maximizeWindow(WINDOW_IDS.TERMINAL);
    expect(useWindowStore.getState().windows.terminal.isMaximized).toBe(true);

    store.closeWindow(WINDOW_IDS.TERMINAL);
    const terminal = useWindowStore.getState().windows.terminal;
    expect(terminal.isOpen).toBe(false);
    expect(terminal.isMinimized).toBe(false);
    expect(terminal.isMaximized).toBe(false);
    expect(terminal.data).toBeNull();
  });
});
