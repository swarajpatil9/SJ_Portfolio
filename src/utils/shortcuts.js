/**
 * @param {{
 * getActiveWindowId: () => import('#types/models.js').WindowId | null,
 * getVisibleWindowIds: () => string[],
 * closeWindow: (windowId: import('#types/models.js').WindowId) => void,
 * minimizeWindow: (windowId: import('#types/models.js').WindowId) => void,
 * focusWindow: (windowId: import('#types/models.js').WindowId) => void,
 * showShortcutToast: (message: string) => void,
 * }} deps
 */
export const createWindowShortcutHandler = (deps) => {
  return (event) => {
    const activeElement = document.activeElement;
    const isTypingContext =
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement ||
      activeElement instanceof HTMLSelectElement ||
      Boolean(activeElement?.getAttribute('contenteditable'));

    if (isTypingContext) return;

    const activeId = deps.getActiveWindowId();
    const withModifier = event.metaKey || event.ctrlKey;

    if (event.key === 'Escape' && activeId) {
      event.preventDefault();
      deps.closeWindow(activeId);
      return;
    }

    if (!withModifier || !activeId) return;

    const key = event.key.toLowerCase();

    if (key === 'w') {
      event.preventDefault();
      deps.closeWindow(activeId);
      return;
    }

    if (key === 'm') {
      event.preventDefault();
      deps.minimizeWindow(activeId);
      return;
    }

    if (key === 'tab') {
      event.preventDefault();
      const visible = deps.getVisibleWindowIds();

      if (visible.length < 2) {
        deps.showShortcutToast('Use Alt+Tab or click dock');
        return;
      }

      const currentIndex = visible.indexOf(activeId);
      const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % visible.length;
      deps.focusWindow(/** @type {import('#types/models.js').WindowId} */ (visible[nextIndex]));
    }
  };
};
