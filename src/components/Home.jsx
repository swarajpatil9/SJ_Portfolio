import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

import { locations } from '#constants';

import { WINDOW_IDS } from '../config/windowIds.js';

import { useWindowActions } from '#store/hooks';
import useLocationStore from '#store/location';

/** @typedef {import('#types/models.js').LocationNode} LocationNode */

/** @typedef {{ x: number, y: number }} Position */
/** @typedef {Record<string, Position>} PositionMap */

/** @type {import('gsap').GSAP} */
const gsapApi = gsap;
/** @type {import('gsap/Draggable').DraggablePlugin} */
const draggablePlugin = Draggable;

try {
  gsapApi.registerPlugin(Draggable);
} catch (error) {
  if (import.meta.env.DEV) {
    console.error('Failed to register Draggable plugin in Home', error);
  }
}

/** @type {LocationNode[]} */
const projects = locations.work?.children ?? [];
const DESKTOP_POSITIONS_KEY = 'desktop-project-positions';

/** @returns {PositionMap} */
const getSavedPositions = () => {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(DESKTOP_POSITIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

/** @param {string} projectId @param {number} x @param {number} y */
const savePosition = (projectId, x, y) => {
  if (typeof window === 'undefined') return;

  const saved = getSavedPositions();
  saved[projectId] = { x, y };
  window.localStorage.setItem(DESKTOP_POSITIONS_KEY, JSON.stringify(saved));
};

const Home = () => {
  const { openWindow } = useWindowActions();
  const setActiveLocation = useLocationStore((state) => state.setActiveLocation);

  /** @param {LocationNode} project */
  const openProject = (project) => {
    setActiveLocation(project);
    openWindow(WINDOW_IDS.FINDER);
  };

  useGSAP(() => {
    const savedPositions = getSavedPositions();
    let draggables = [];

    try {
      draggables = draggablePlugin.create('.desktop-folder', {
        bounds: 'body',
        dragClickables: false,
        /** @this {{ target: HTMLElement }} */
        onPress() {
          this.target.style.zIndex = '20';
        },
        /** @this {{ target: HTMLElement }} */
        onRelease() {
          this.target.style.zIndex = '0';
        },
        /** @this {{ target: HTMLElement, x: number, y: number }} */
        onDragEnd() {
          const { projectId } = this.target.dataset;
          if (!projectId) return;
          savePosition(projectId, this.x, this.y);
        },
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to initialize desktop draggable items', error);
      }
      return () => {};
    }

    draggables.forEach((draggable) => {
      const { projectId } = draggable.target.dataset;
      const saved = projectId ? savedPositions[projectId] : null;

      if (!saved) return;
      gsapApi.set(draggable.target, { x: saved.x, y: saved.y });
      draggable.update();
    });

    return () => {
      draggables.forEach((draggable) => draggable.kill());
    };
  }, []);

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            data-project-id={project.id}
            className={clsx('group desktop-folder', project.position)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${project.name}`}
            onDoubleClick={() => openProject(project)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProject(project);
              }
            }}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
