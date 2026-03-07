import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants/index.js';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useWindowStore = create(
    immer((set)  => ({
    
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        previewWindow: null,

        setPreviewWindow: (windowKey) => 
            set((state) => {
                state.previewWindow = windowKey;
        }),

        openWindow: (windowKey, data = null) => 
            set((state) => {
                const window = state.windows[windowKey];
                window.isOpen = true;
                window.isMinimized = false;
                window.data = data ?? window.data;
                window.zIndex = state.nextZIndex;
                state.nextZIndex ++;
        }),

        closeWindow: (windowKey) => 
            set((state) => {
                const window = state.windows[windowKey];
                window.isOpen = false;
                window.isMinimized = false;
                window.data = null;
                window.zIndex = INITIAL_Z_INDEX;  
        }),

        minimizeWindow: (windowKey) => 
            set((state) => {
                const window = state.windows[windowKey];
                window.isMinimized = true;
        }),

        unminimizeWindow: (windowKey) => 
            set((state) => {
                const window = state.windows[windowKey];
                window.isMinimized = false;
                window.zIndex = state.nextZIndex;
                state.nextZIndex++;
        }),

        maximizeWindow: (windowKey) => 
            set((state) => {
                const window = state.windows[windowKey];
                window.isMaximized = !window.isMaximized;
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