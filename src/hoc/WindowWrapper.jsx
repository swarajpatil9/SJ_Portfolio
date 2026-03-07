import React, { useLayoutEffect } from 'react'
import useWindowStore from "#store/window";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows, previewWindow } = useWindowStore();
        const { isOpen, zIndex, isMaximized, isMinimized } = windows[windowKey];
        const ref = useRef(null);
        const wasOpen = useRef(false);
        const wasMinimized = useRef(false);

        const isPreview = previewWindow === windowKey && !isOpen;
        const shouldShow = isOpen && !isMinimized;

        useGSAP(() => {
            const el = ref.current;
            if(!el) return;

            if (shouldShow) {
                if (wasMinimized.current) {
                    // Restore from minimize - animate from dock
                    gsap.fromTo(el,
                        { scale: 0.2, opacity: 0, y: window.innerHeight - 100, display: "block" },
                        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                    );
                    wasMinimized.current = false;
                } else {
                    // Regular open animation
                    gsap.fromTo(el, 
                        { scale: 0.8, opacity: 0, y: 40, display: "block" }, 
                        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
                    );
                }
                wasOpen.current = true;
            } else if (wasOpen.current && isMinimized) {
                // Minimize animation - scale down to dock
                gsap.to(el, {
                    scale: 0.2,
                    opacity: 0,
                    y: window.innerHeight - 100,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => {
                        el.style.display = "none";
                        wasMinimized.current = true;
                    }
                });
            } else if (wasOpen.current && !isOpen) {
                // Close animation
                gsap.to(el, {
                    scale: 0.8,
                    opacity: 0,
                    y: 40,
                    duration: 0.3,
                    ease: "power3.in",
                    onComplete: () => {
                        el.style.display = "none";
                        wasMinimized.current = false;
                    }
                });
            }
        }, [shouldShow, isMinimized, isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if(!el) return;

            if (isPreview) {
                // Show preview instantly without animation
                el.style.display = "block";
                el.style.opacity = "0.9";
                el.style.transform = "scale(1) translateY(0)";
                el.style.pointerEvents = "none"; // Disable interaction in preview mode
            } else if (!isOpen) {
                // Hide preview instantly if not open
                el.style.display = "none";
                el.style.opacity = "0";
            } else {
                // Enable interaction when fully open
                el.style.pointerEvents = "auto";
            }
        }, [isPreview, isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            // Find the h2 title element to use as drag trigger (not the whole header)
            const title = el.querySelector('#window-header h2');

            // Only make draggable when window is actually open
            const draggableInstance = Draggable.create(el, { 
                trigger: title || el.querySelector('#window-header'), // Drag from title only
                onPress: () => focusWindow(windowKey),
                bounds: "body",
                dragClickables: false // Don't allow dragging clickable elements
            })[0];

            return () => {
                // Cleanup: destroy draggable instance
                draggableInstance?.kill();
            };
        }, [isOpen]);

        useLayoutEffect(() => {
            const el = ref.current;
            if(!el) return;
            el.style.display = "none";  // Just set initial state
        }, []);  // Empty array - only run once

       

        return (
            <section 
                id={windowKey} 
                ref={ref} 
                style={{ 
                    zIndex, 
                    display: "none",
                    ...(isMaximized && {
                        top: "3rem",
                        left: "0.5rem",
                        right: "0.5rem",
                        bottom: "0.5rem",
                        width: "calc(100% - 1rem)",
                        height: "calc(100% - 3.5rem)"
                    })
                }}
                className={`absolute ${isMaximized ? "w-full! h-full!" : ""}`}
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
