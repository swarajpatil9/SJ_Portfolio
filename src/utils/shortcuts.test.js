import { describe, expect, it, vi } from 'vitest';

import { createWindowShortcutHandler } from './shortcuts.js';

const createKeyboardEvent = (key, options = {}) => ({
  key,
  metaKey: false,
  ctrlKey: false,
  preventDefault: vi.fn(),
  ...options,
});

describe('keyboard shortcuts', () => {
  it('closes active window on Escape', () => {
    const closeWindow = vi.fn();
    const handler = createWindowShortcutHandler({
      getActiveWindowId: () => 'finder',
      getVisibleWindowIds: () => ['finder'],
      closeWindow,
      minimizeWindow: vi.fn(),
      focusWindow: vi.fn(),
      showShortcutToast: vi.fn(),
    });

    const event = createKeyboardEvent('Escape');
    handler(event);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(closeWindow).toHaveBeenCalledWith('finder');
  });

  it('cycles windows with modifier + tab', () => {
    const focusWindow = vi.fn();
    const handler = createWindowShortcutHandler({
      getActiveWindowId: () => 'finder',
      getVisibleWindowIds: () => ['finder', 'terminal'],
      closeWindow: vi.fn(),
      minimizeWindow: vi.fn(),
      focusWindow,
      showShortcutToast: vi.fn(),
    });

    const event = createKeyboardEvent('Tab', { metaKey: true });
    handler(event);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(focusWindow).toHaveBeenCalledWith('terminal');
  });
});
