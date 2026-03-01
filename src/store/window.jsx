import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useWindowStore = create(
    immer((set)  => ({
    
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) => 
            set((state) => {
                const window = state.windows[windowKey];
                window.isOpen = true;
                window.data = data ?? window.data;
                window.zIndex = state.nextZIndex;
                state.nextZIndex ++;
        }),

        closeWindow: (windowKey) => 
            set((state) => {
                const window = state.windows[windowKey];
                window.isOpen = false;
                window.data = null;
                window.zIndex = INITIAL_Z_INDEX;  
        }),

        focusWindow: (windowKey) => 
            set((state) => {
                const window = state.windows[windowKey];
                window.zIndex = state.nextZIndex;
                state.nextZIndex++;
        }),   
    })),
);

export default useWindowStore;