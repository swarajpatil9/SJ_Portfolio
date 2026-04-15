import { describe, expect, it } from 'vitest';

import { resolveFinderAction } from '../utils/finderActions.js';

import { WINDOW_IDS } from '#config/windowIds.js';

describe('finder file handling', () => {
  it('resolves folder navigation', () => {
    const action = resolveFinderAction({ id: 1, name: 'Work', icon: '', kind: 'folder' });
    expect(action.type).toBe('navigate-folder');
  });

  it('resolves pdf files to resume window', () => {
    const action = resolveFinderAction({
      id: 2,
      name: 'Resume.pdf',
      icon: '',
      kind: 'file',
      fileType: 'pdf',
    });

    expect(action.type).toBe('open-window');
    expect(action.windowId).toBe(WINDOW_IDS.RESUME);
  });

  it('resolves url files to external link action', () => {
    const action = resolveFinderAction({
      id: 3,
      name: 'site.url',
      icon: '',
      kind: 'file',
      fileType: 'url',
      href: 'https://example.com',
    });

    expect(action.type).toBe('open-link');
    expect(action.href).toBe('https://example.com');
  });

  it('resolves text files to text viewer window', () => {
    const action = resolveFinderAction({
      id: 4,
      name: 'notes.txt',
      icon: '',
      kind: 'file',
      fileType: 'txt',
      description: ['a'],
    });

    expect(action.type).toBe('open-window');
    expect(action.windowId).toBe(WINDOW_IDS.TEXT_FILE);
  });
});
