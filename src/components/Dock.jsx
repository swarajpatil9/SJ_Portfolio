
import { dockApps } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import useWindowStore from "#store/window.jsx";

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const  dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const{ left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left : iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 3) / 20000);

        gsap.to(icon, {
          duration: 0.2,
          ease: "power1.out",
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
        });
      });
    };

    const handleMouseMove = (event) => {
      const { left } = dock.getBoundingClientRect();

      animateIcons(event.clientX - left);
    };

    const resetIcon = () => {
      icons.forEach((icon) =>
        gsap.to(icon, {
          duration: 0.3,
          ease: "power1.out",
          scale: 1,
          y: 0,
        
        }));
    };
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcon);
  
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcon);
    };
  }, []);

  
  const toggleApp = (app) => {
    if(!app.canOpen) return;

    const window = useWindowStore.getState().windows[app.id];

    if(window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }

    console.log('Updated state:', useWindowStore.getState().windows);
  };
  
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button 
            type = "button" 
            className="dock-icon"
            aria-label={name}
            data-tooltip-id = "dock-tooltip"
            data-tooltip-content = {name}
            data-tooltip-delay-show = {150}
            disabled={!canOpen}
            onClick={() => toggleApp({ id, canOpen })} 
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section> 
  );
};

export default Dock;
