import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { locations } from '#constants/index.js';

/** @typedef {import('#types/models.js').LocationNode} LocationNode */
/** @typedef {import('#types/models.js').LocationStore} LocationStore */

/** @type {LocationNode} */
const DEFAULT_LOCATION = locations.work;

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<LocationStore>>} */
const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    /** @param {LocationNode | null=} location */
    setActiveLocation: (location = null) =>
      set((state) => {
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
