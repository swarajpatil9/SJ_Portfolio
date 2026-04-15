# Codebase Explanation

## Project Overview

This project is a macOS-inspired interactive portfolio built with React and Vite. Instead of a static page layout, it behaves like a mini desktop system where users can open, drag, minimize, and close app windows.

Core goals:

- Feel like a real desktop environment
- Keep architecture scalable and maintainable
- Enforce predictable state and runtime safety
- Preserve performance with lazy loading and focused re-renders

## Tech Stack

- React 19 + Vite
- Zustand + Immer (state)
- GSAP + Draggable (motion and drag behavior)
- Tailwind CSS (UI styling)
- JSDoc-based type modeling (strong editor-time validation)

## High-Level Structure

- src/App.jsx: Application shell, route mounting, lazy window loading, keyboard shortcuts
- src/components/: Shared UI pieces (Dock, Navbar, WindowControls, Home, Welcome, boundaries/fallbacks)
- src/windows/: Individual desktop apps (Finder, Safari, Terminal, Resume, Contact, file viewers, blog article, photos)
- src/store/: Zustand stores and strict selector hooks
- src/constants/: Static config and data (dock config, locations, blog data)
- src/config/: IDs, routes, motion config, environment values
- src/utils/: Validation and guard utilities
- src/hoc/WindowWrapper.jsx: Shared behavior layer for desktop windows
- src/types/models.js: JSDoc models for app entities and store contracts

## Window System Design

The window system is config-driven and centralized.

How it works:

1. Window keys are defined in config and mirrored in store state.
2. Dock or navigation actions call store actions through selector hooks.
3. Each window component is wrapped by WindowWrapper.
4. WindowWrapper handles:
   - Open/close/minimize transitions
   - Drag behavior
   - Resize behavior
   - Focus and z-index ordering
5. WindowControls dispatch close/minimize/maximize actions to store.

Why this is important:

- All windows follow one behavioral contract.
- Adding new windows is predictable and low risk.
- No duplicate interaction logic across features.

## State Management

State is managed with Zustand and Immer in focused slices.

Primary stores:

- window store: visibility, z-index, minimized/maximized state, attached window data
- location store: active Finder location context

Access pattern:

- Components do not directly mutate global state.
- Selector hooks expose only required fields/actions.
- This minimizes unnecessary re-renders and keeps component boundaries clean.

## Finder and File Flow

Finder renders hierarchical location data from constants.

Interaction mapping:

- folder -> switches active location
- txt file -> opens text file window with content payload
- img file -> opens image window with source payload
- pdf file -> opens resume window
- fig/url -> opens external link in new tab

Guard behavior:

- Invalid or unsupported file structures degrade safely
- Empty states are shown where data is missing

## Blog System

Blog has two coordinated layers:

- Blog catalog for list rendering
- Blog content map keyed by slug for full article rendering

Route:

- /blog/:slug renders article view
- Unknown slug renders a graceful fallback state

This avoids list/content drift and keeps routing integrity stable.

## Routing and Reliability

- Home route mounts desktop interface
- Blog route mounts full article experience
- Catch-all route provides a not-found fallback
- Error boundaries prevent full-app crashes
- Loading fallbacks keep async window loads intentional

## Performance Strategy

- Lazy-loaded windows and route chunks
- Localized selectors to reduce re-render scope
- Config-driven rendering to avoid repeated ad hoc logic
- Defensive defaults and empty states for resilience

## Why This Architecture Scales

- New app windows can be added with minimal touch points
- Shared wrapper ensures behavior consistency
- Data-driven content layers reduce hardcoded UI drift
- Validation + typed models lower runtime bug risk

## Typical Add-a-Window Checklist

1. Add window ID and window config entry.
2. Add dock item if user-launchable.
3. Create window component in src/windows.
4. Wrap component with WindowWrapper.
5. Mount lazily in App shell.
6. Ensure WindowControls target is correct.
7. Add data handler mappings if Finder-launchable.
8. Validate with lint, typecheck, and build.
