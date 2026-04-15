# 🖥️ macOS Portfolio OS

A production-grade, macOS-inspired desktop environment built entirely in React.

This is not a typical portfolio.
It is a fully interactive system with window management, drag interactions, and application-like experiences — engineered with real-world frontend principles.

---

## 🚀 Live Demo

👉 [Add your deployed link here]

---

## ✨ Features

* 🪟 Window management system (open, close, minimize, focus)
* 🖱️ Drag & resize interactions with smooth motion
* 🧠 Zustand-powered state management (type-safe + enforced)
* ⚡ Performance optimized (lazy loading + code splitting)
* 🎯 Keyboard shortcuts (Cmd/Ctrl + W, M, Tab, Esc)
* 🧩 Finder-style file system with dynamic content
* 🌐 Blog routing system with safe fallbacks
* 🛡️ Runtime validation + defensive UI patterns
* 🎨 Premium UX with motion system & interaction polish

---

## 🏗️ Architecture

```
src/
  components/
  windows/
  hooks/
  store/
  utils/
  config/
  constants/
  models/
```

### Key Concepts:

* Hook-based state access (no direct store usage)
* Config-driven system (windows, routes, dock)
* Centralized validation layer
* Immutable configs
* Type-safe JSDoc system (TS-ready)

---

## ⚙️ Tech Stack

* React 19 + Vite
* Zustand + Immer
* GSAP (animations)
* Tailwind CSS
* JSDoc Type Safety

---

## ⚡ Performance

* Lazy-loaded windows
* Route-based code splitting
* Optimized re-renders using selectors
* Lightweight bundle strategy

---

## 🛡️ Engineering Highlights

* Prevented invalid states via typed access patterns
* Enforced store usage through custom hooks
* Centralized validation layer for runtime safety
* Config immutability to eliminate mutation bugs
* Error boundaries + fallback UI across system

---

## 🎯 What makes this different?

Most portfolios show projects.
This project **is a system**.

---

## 📦 Setup

```bash
npm install
npm run dev
```

---

## 🧠 Future Improvements

* Full TypeScript migration
* Testing (Vitest)
* Multi-desktop support
* Persistent state

---

## 👨‍💻 Author

Your Name
