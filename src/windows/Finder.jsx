import clsx from 'clsx';
import { Search } from 'lucide-react';

import { WindowControls } from '#components';

import { WINDOW_IDS } from '../config/windowIds';
import { resolveFinderAction } from '../utils/finderActions.js';

import { locations } from '#constants/index.js';
import WindowWrapper from '#hoc/WindowWrapper';
import { useWindowActions } from '#store/hooks.js';
import useLocationStore from '#store/location.jsx';

/** @typedef {import('#types/models.js').LocationNode} LocationNode */

const Finder = () => {
  const { openWindow } = useWindowActions();
  const activeLocation = useLocationStore((state) => state.activeLocation);
  const setActiveLocation = useLocationStore((state) => state.setActiveLocation);

  /** @param {LocationNode} item */
  const openItem = (item) => {
    const action = resolveFinderAction(item);

    if (action.type === 'navigate-folder' && action.payload) {
      return setActiveLocation(action.payload);
    }

    if (action.type === 'open-link' && action.href) {
      return window.open(action.href, '_blank', 'noopener,noreferrer');
    }

    if (action.type === 'open-window' && action.windowId) {
      return openWindow(action.windowId, action.payload ?? null);
    }

    return null;
  };

  /** @param {string} title @param {LocationNode[]} items */
  const renderList = (title, items) => (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(item.id === activeLocation?.id ? 'active' : 'not-active')}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  if (!activeLocation) {
    console.warn('Missing data:', 'activeLocation');
    return (
      <>
        <div id="window-header">
          <WindowControls target={WINDOW_IDS.FINDER} />
          <Search className="icon" />
        </div>
        <div className="window-empty-state">Location data is unavailable.</div>
      </>
    );
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target={WINDOW_IDS.FINDER} />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList('Locations', Object.values(locations))}
          {renderList('Work', locations.work.children ?? [])}
        </div>

        <ul className="content">
          {(activeLocation.children ?? []).length === 0 ? (
            <li className="text-sm text-gray-500 p-4">No items in this folder.</li>
          ) : (
            (activeLocation.children ?? []).map((item) => (
              <li key={item.id} className={item.position} onClick={() => openItem(item)}>
                <img src={item.icon} alt={item.name} className="w-6" />
                <p>{item.name}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, WINDOW_IDS.FINDER);
export default FinderWindow;
