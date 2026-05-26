declare module 'gsap' {
  export interface GSAPTweenVars {
    duration?: number;
    ease?: string;
    scale?: number;
    opacity?: number;
    y?: number;
    display?: string;
    width?: string;
    height?: string;
    left?: string;
    top?: string;
    onComplete?: () => void;
    [key: string]: unknown;
  }

  export interface GSAP {
    to(target: unknown, vars: GSAPTweenVars): unknown;
    fromTo(target: unknown, fromVars: GSAPTweenVars, toVars: GSAPTweenVars): unknown;
    set(target: unknown, vars: GSAPTweenVars): unknown;
    registerPlugin(...plugins: unknown[]): void;
  }

  const gsap: GSAP;
  export default gsap;
}

declare module '@gsap/react' {
  export function useGSAP(effect: () => void | (() => void), deps?: unknown[]): void;
}

declare module 'gsap/Draggable' {
  export interface DraggableInstance {
    target: HTMLElement;
    x: number;
    y: number;
    update: () => void;
    kill: () => void;
  }

  export interface DraggablePlugin {
    create: (target: unknown, vars: Record<string, unknown>) => DraggableInstance[];
  }

  export const Draggable: DraggablePlugin;
}

declare module 'gsap/draggable' {
  export * from 'gsap/Draggable';
}
