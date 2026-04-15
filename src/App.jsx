import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { Dock, Home, Navbar, Welcome, ErrorBoundary, LoadingFallback } from '#components';

import { APP_MESSAGES } from './config/appConstants';
import { APP_ROUTES } from './config/routes';
import { applySeoMeta } from './utils/seo.js';
import { createWindowShortcutHandler } from './utils/shortcuts.js';
import { trackPageView } from './utils/telemetry.js';

import { useActiveWindow, useWindowActions, useWindows } from '#store/hooks';

const TerminalWindow = lazy(() => import('#windows/Terminal'));
const Safari = lazy(() => import('#windows/Safari'));
const ResumeWindow = lazy(() => import('#windows/Resume'));
const Finder = lazy(() => import('#windows/Finder'));
const TextFileWindow = lazy(() => import('#windows/TextFile'));
const ImageFileWindow = lazy(() => import('#windows/ImageFile'));
const Contact = lazy(() => import('#windows/Contact'));
const Photos = lazy(() => import('#windows/Photos'));
const BlogArticle = lazy(() => import('#windows/BlogArticle'));

const windowFallback = <LoadingFallback message={APP_MESSAGES.LOADING_WINDOW} />;
const windowErrorFallback = (
  <div className="p-4 text-sm text-gray-600">{APP_MESSAGES.WINDOW_ERROR}</div>
);

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-semibold text-gray-800">Page not found</h1>
        <p className="text-sm text-gray-500">The page you requested does not exist.</p>
        <a href={APP_ROUTES.HOME} className="text-sm text-blue-600 hover:underline">
          Go to home
        </a>
      </div>
    </div>
  );
};

const RouteEffects = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);

    if (location.pathname.startsWith('/blog/')) return;

    if (location.pathname === APP_ROUTES.HOME) {
      applySeoMeta({
        title: 'Swaraj Patil | Frontend Engineer Portfolio',
        description:
          'Explore a production-grade React portfolio with macOS-style UX, architecture highlights, and technical blog content.',
        urlPath: APP_ROUTES.HOME,
        image: '/images/wallpaper.png',
      });
      return;
    }

    applySeoMeta({
      title: 'Page not found | Swaraj Patil',
      description: 'The requested page could not be found.',
      urlPath: location.pathname,
    });
  }, [location.pathname]);

  return null;
};

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Welcome />
      <Dock />
      <ErrorBoundary fallback={windowErrorFallback}>
        <Suspense fallback={windowFallback}>
          <TerminalWindow />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={windowErrorFallback}>
        <Suspense fallback={windowFallback}>
          <Safari />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={windowErrorFallback}>
        <Suspense fallback={windowFallback}>
          <ResumeWindow />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={windowErrorFallback}>
        <Suspense fallback={windowFallback}>
          <Finder />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={windowErrorFallback}>
        <Suspense fallback={windowFallback}>
          <TextFileWindow />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={windowErrorFallback}>
        <Suspense fallback={windowFallback}>
          <ImageFileWindow />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={windowErrorFallback}>
        <Suspense fallback={windowFallback}>
          <Contact />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={windowErrorFallback}>
        <Suspense fallback={windowFallback}>
          <Photos />
        </Suspense>
      </ErrorBoundary>
      <Home />
    </>
  );
};

const App = () => {
  const [shortcutToast, setShortcutToast] = React.useState('');
  const activeWindow = useActiveWindow();
  const { closeWindow, minimizeWindow, focusWindow } = useWindowActions();
  const windows = useWindows();

  const showShortcutToast = (message) => {
    setShortcutToast(message);
    window.setTimeout(() => setShortcutToast(''), 1800);
  };

  useEffect(() => {
    const onKeyDown = createWindowShortcutHandler({
      getActiveWindowId: () => activeWindow?.id ?? null,
      getVisibleWindowIds: () =>
        Object.entries(windows)
          .filter(([, state]) => state.isOpen && !state.isMinimized)
          .sort((a, b) => b[1].zIndex - a[1].zIndex)
          .map(([id]) => id),
      closeWindow,
      minimizeWindow,
      focusWindow,
      showShortcutToast,
    });

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeWindow?.id, closeWindow, focusWindow, minimizeWindow, windows]);

  return (
    <Router>
      <main>
        <RouteEffects />
        {shortcutToast ? (
          <div className="shortcut-toast" role="status" aria-live="polite">
            {shortcutToast}
          </div>
        ) : null}
        <Routes>
          <Route path={APP_ROUTES.HOME} element={<HomePage />} />
          <Route
            path={APP_ROUTES.BLOG_ARTICLE}
            element={
              <ErrorBoundary
                fallback={<div className="p-4 text-sm text-gray-600">{APP_MESSAGES.APP_ERROR}</div>}
              >
                <Suspense fallback={<LoadingFallback message={APP_MESSAGES.LOADING_ARTICLE} />}>
                  <BlogArticle />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
};
export default App;
