import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useRef } from 'react';
import React, { useLayoutEffect, useState } from 'react';

import { MOTION } from '../config/motion.js';
import { useActiveWindow, usePreviewWindow, useWindow, useWindowActions } from '../store/hooks.js';

/** @typedef {import('#types/models.js').WindowId} WindowId */
/** @typedef {import('react').ComponentType<any>} AnyComponent */

/** @type {import('gsap').GSAP} */
const gsapApi = gsap;
/** @type {import('gsap/Draggable').DraggablePlugin} */
const draggablePlugin = Draggable;

try {
  gsapApi.registerPlugin(Draggable);
} catch (error) {
  if (import.meta.env.DEV) {
    console.error('Failed to register Draggable plugin in WindowWrapper', error);
  }
}

/**
 * @param {AnyComponent} Component
 * @param {WindowId} windowKey
 */
const WindowWrapper = (Component, windowKey) => {
  /** @param {Record<string, unknown>} props */
  const Wrapped = (props) => {
    const { focusWindow } = useWindowActions();
    const previewWindow = usePreviewWindow();
    const activeWindow = useActiveWindow();
    const windowState = useWindow(windowKey);
    const hasWindowState = Boolean(windowState);
    const { isOpen, zIndex, isMaximized, isMinimized } = windowState ?? {
      isOpen: false,
      zIndex: 0,
      isMaximized: false,
      isMinimized: false,
    };
    const ref = useRef(/** @type {HTMLElement | null} */ (null));
    const wasOpen = useRef(false);
    const wasMinimized = useRef(false);
    const [size, setSize] = useState({ width: 600, height: 400 });
    const customPosition = useRef({ x: 0, y: 0 });

    const isPreview = previewWindow === windowKey && !isOpen;
    const shouldShow = isOpen && !isMinimized;
    const isActive = activeWindow?.id === windowKey && shouldShow;

    const getDockTargetOffset = () => {
      const el = ref.current;
      if (!el) return { x: 0, y: window.innerHeight - 100 };

      const dockButton = document.querySelector(`#dock .dock-icon[data-window-id="${windowKey}"]`);
      if (!dockButton) return { x: 0, y: window.innerHeight - 100 };

      const windowRect = el.getBoundingClientRect();
      const dockRect = dockButton.getBoundingClientRect();
      const windowCenterX = windowRect.left + windowRect.width / 2;
      const windowCenterY = windowRect.top + windowRect.height / 2;
      const dockCenterX = dockRect.left + dockRect.width / 2;
      const dockCenterY = dockRect.top + dockRect.height / 2;

      return { x: dockCenterX - windowCenterX, y: dockCenterY - windowCenterY };
    };

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (shouldShow) {
        const target = getDockTargetOffset();
        if (wasMinimized.current) {
          // Restore from minimize - animate from dock
          gsapApi.fromTo(
            el,
            { scale: 0.2, opacity: 0, x: target.x, y: target.y, display: 'block' },
            {
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
              duration: MOTION.SLOW,
              ease: MOTION.EASE.STANDARD_OUT,
            }
          );
          wasMinimized.current = false;
        } else {
          // Regular open animation
          gsapApi.fromTo(
            el,
            { scale: 0.8, opacity: 0, y: 40, display: 'block' },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: MOTION.NORMAL,
              ease: MOTION.EASE.EMPHASIS_OUT,
            }
          );
        }
        wasOpen.current = true;
      } else if (wasOpen.current && isMinimized) {
        const target = getDockTargetOffset();
        // Minimize animation - scale down to dock
        gsapApi.to(el, {
          scale: 0.2,
          opacity: 0,
          x: target.x,
          y: target.y,
          duration: MOTION.SLOW,
          ease: MOTION.EASE.STANDARD_IN,
          onComplete: () => {
            el.style.display = 'none';
            wasMinimized.current = true;
          },
        });
      } else if (wasOpen.current && !isOpen) {
        // Close animation
        gsapApi.to(el, {
          scale: 0.8,
          opacity: 0,
          y: 40,
          duration: MOTION.NORMAL,
          ease: MOTION.EASE.EMPHASIS_IN,
          onComplete: () => {
            el.style.display = 'none';
            wasMinimized.current = false;
          },
        });
      }
    }, [shouldShow, isMinimized, isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isPreview) {
        // Show preview with a subtle fade for less abrupt transitions.
        el.style.display = 'block';
        gsapApi.to(el, {
          opacity: 0.9,
          duration: MOTION.FAST,
          ease: MOTION.EASE.STANDARD_OUT,
        });
        el.style.pointerEvents = 'none'; // Disable interaction in preview mode
      } else if (!isOpen) {
        // Hide preview instantly if not open
        el.style.display = 'none';
        el.style.opacity = '0';
      } else {
        // Enable interaction when fully open
        el.style.pointerEvents = 'auto';
      }
    }, [isPreview, isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      const header = el.querySelector('#window-header');

      // Only make draggable when window is open AND not maximized
      if (!isMaximized) {
        let draggableInstance = null;

        try {
          draggableInstance = draggablePlugin.create(el, {
            trigger: header || el,
            onPress: () => focusWindow(windowKey),
            onDragStart: () => {
              if (header instanceof HTMLElement) header.style.cursor = 'grabbing';
            },
            onDragEnd: () => {
              if (header instanceof HTMLElement) header.style.cursor = 'grab';
            },
            bounds: 'body',
            edgeResistance: 0.85,
            dragResistance: 0.05,
            dragClickables: false,
          })[0];
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error(`Failed to initialize draggable window: ${windowKey}`, error);
          }
          return;
        }

        return () => {
          // Cleanup: destroy draggable instance
          draggableInstance?.kill();
        };
      }
    }, [isOpen, isMaximized]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMinimized) return;

      gsapApi.to(el, {
        scale: isActive ? 1.012 : 1,
        opacity: isActive ? 1 : 0.96,
        boxShadow: isActive
          ? '0 24px 48px rgba(15, 23, 42, 0.24)'
          : '0 14px 30px rgba(15, 23, 42, 0.16)',
        duration: MOTION.FAST,
        ease: MOTION.EASE.STANDARD_OUT,
      });
    }, [isActive, isOpen, isMinimized]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = 'none'; // Just set initial state
    }, []); // Empty array - only run once

    // Resize functionality
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMaximized) return;

      const minWidth = 300;
      const minHeight = 200;
      const resizeThreshold = 8; // pixels from edge to activate resize

      let isResizing = false;
      let resizeDirection = '';
      let startX = 0,
        startY = 0;
      let startWidth = 0,
        startHeight = 0;
      let startLeft = 0,
        startTop = 0;

      /** @param {MouseEvent} e */
      const getResizeDirection = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const nearTop = y < resizeThreshold;
        const nearBottom = y > rect.height - resizeThreshold;
        const nearLeft = x < resizeThreshold;
        const nearRight = x > rect.width - resizeThreshold;

        if (nearTop && nearLeft) return 'nw';
        if (nearTop && nearRight) return 'ne';
        if (nearBottom && nearLeft) return 'sw';
        if (nearBottom && nearRight) return 'se';
        if (nearTop) return 'n';
        if (nearBottom) return 's';
        if (nearLeft) return 'w';
        if (nearRight) return 'e';

        return '';
      };

      /** @param {string} direction */
      const getCursor = (direction) => {
        const cursors = {
          n: 'ns-resize',
          s: 'ns-resize',
          e: 'ew-resize',
          w: 'ew-resize',
          ne: 'nesw-resize',
          sw: 'nesw-resize',
          nw: 'nwse-resize',
          se: 'nwse-resize',
        };
        return cursors[direction] || '';
      };

      /** @param {MouseEvent} e */
      const handleMouseMove = (e) => {
        if (!isResizing) {
          // Only check for resize direction if mouse is over the element
          const rect = el.getBoundingClientRect();
          const isOverElement =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

          if (isOverElement) {
            const direction = getResizeDirection(e);
            el.style.cursor = getCursor(direction) || 'default';
          }
          return;
        }

        e.preventDefault();
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(minWidth, startWidth + deltaX);
        }
        if (resizeDirection.includes('w')) {
          const widthChange = Math.min(deltaX, startWidth - minWidth);
          newWidth = startWidth - widthChange;
          newLeft = startLeft + widthChange;
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(minHeight, startHeight + deltaY);
        }
        if (resizeDirection.includes('n')) {
          const heightChange = Math.min(deltaY, startHeight - minHeight);
          newHeight = startHeight - heightChange;
          newTop = startTop + heightChange;
        }

        el.style.width = `${newWidth}px`;
        el.style.height = `${newHeight}px`;
        el.style.left = `${newLeft}px`;
        el.style.top = `${newTop}px`;

        setSize({ width: newWidth, height: newHeight });
        customPosition.current = { x: newLeft, y: newTop };
      };

      /** @param {MouseEvent} e */
      const handleMouseDown = (e) => {
        const direction = getResizeDirection(e);
        if (!direction) return;

        e.preventDefault();
        e.stopPropagation();

        isResizing = true;
        resizeDirection = direction;
        startX = e.clientX;
        startY = e.clientY;

        const rect = el.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;

        // Prevent text selection during resize
        document.body.style.userSelect = 'none';
        el.style.cursor = getCursor(direction);

        focusWindow(windowKey);
      };

      const handleMouseUp = () => {
        if (isResizing) {
          isResizing = false;
          resizeDirection = '';
          el.style.cursor = 'default';
          document.body.style.userSelect = '';
        }
      };

      const handleMouseLeave = () => {
        if (!isResizing) {
          el.style.cursor = 'default';
        }
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mousedown', handleMouseDown);
      el.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }, [isOpen, isMaximized]);

    if (!hasWindowState) return null;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          display: 'none',
          ...(isMaximized
            ? {
                top: '3rem',
                left: '0.5rem',
                right: '0.5rem',
                bottom: '0.5rem',
                width: 'calc(100% - 1rem)',
                height: 'calc(100% - 3.5rem)',
              }
            : {
                width: `${size.width}px`,
                height: `${size.height}px`,
              }),
        }}
        className={`app-window absolute ${isMaximized ? 'w-full! h-full!' : ''}`}
        onClick={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };
  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

  return Wrapped;
};

export default WindowWrapper;
