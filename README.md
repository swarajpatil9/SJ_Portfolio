# Portfolio Site

A production-ready React + Vite portfolio application with a desktop-inspired interface (dock, windows, and app-like navigation).

## Key Features

- Desktop-style interaction model with draggable windows
- Dock-driven window lifecycle (open, focus, minimize, close)
- Window apps: Finder, Terminal, Safari-style content browser, Resume, Contact, text/image viewers
- Blog article routing with dedicated article pages
- Animation-rich interactions powered by GSAP
- Modular app state powered by Zustand + Immer

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Zustand + Immer
- GSAP
- React Router
- React PDF
- ESLint + Prettier

## Architecture Overview

Top-level structure:

- `src/components`: shared UI building blocks (Dock, Navbar, Welcome, etc.)
- `src/windows`: app window implementations (Finder, Terminal, Safari, Resume, etc.)
- `src/store`: Zustand stores for global app/window state
- `src/config`: app-level constants and route config
- `src/constants`: static datasets and window metadata
- `src/hoc`: reusable wrappers (`WindowWrapper`) for window behavior

Runtime flow (simplified):

1. User clicks an app icon in the dock.
2. Window store updates the corresponding window state.
3. `WindowWrapper` animates and renders the target window.
4. Routing handles standalone pages such as blog articles.

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open the printed local URL in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev`: Start Vite development server
- `npm run build`: Create production build in `dist/`
- `npm run preview`: Serve the production build locally
- `npm run lint`: Run ESLint (fails on warnings)
- `npm run lint:fix`: Auto-fix lint issues where possible
- `npm run format`: Format files with Prettier
- `npm run format:check`: Verify formatting without writing
- `npm run typecheck`: Run TypeScript-based JS/JSX checks
- `npm run analyze`: Build with bundle report at `dist/bundle-analysis.html`

## Screenshots

Add project screenshots here.

Suggested files:

- `public/images/screenshot-home.png`
- `public/images/screenshot-window-stack.png`
- `public/images/screenshot-blog.png`

## Performance Notes

- Manual chunk splitting is configured in Vite for key dependency groups.
- Route/window code-splitting is used with `React.lazy` + `Suspense`.
- Bundle analysis is available through `npm run analyze`.

## Future Improvements

- Add integration/e2e tests for window lifecycle interactions
- Improve accessibility audit coverage (keyboard flows + ARIA)
- Add CI workflow for lint, typecheck, build, and formatting checks
- Add visual regression snapshots for critical windows

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and coding guidelines.
