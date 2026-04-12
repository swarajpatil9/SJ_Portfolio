import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dock, Home, Navbar, Welcome, ErrorBoundary, LoadingFallback } from "#components";
import { APP_ROUTES } from "./config/routes";
import { APP_MESSAGES } from "./config/appConstants";

const TerminalWindow = lazy(() => import('#windows/Terminal'));
const Safari = lazy(() => import('#windows/Safari'));
const ResumeWindow = lazy(() => import('#windows/Resume'));
const Finder = lazy(() => import('#windows/Finder'));
const TextFileWindow = lazy(() => import('#windows/TextFile'));
const ImageFileWindow = lazy(() => import('#windows/ImageFile'));
const Contact = lazy(() => import('#windows/Contact'));
const BlogArticle = lazy(() => import('#windows/BlogArticle'));

const windowFallback = <LoadingFallback message={APP_MESSAGES.LOADING_WINDOW} />;
const windowErrorFallback = <div className="p-4 text-sm text-gray-600">{APP_MESSAGES.WINDOW_ERROR}</div>;

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Welcome />
            <Dock />
            <ErrorBoundary fallback={windowErrorFallback}><Suspense fallback={windowFallback}><TerminalWindow /></Suspense></ErrorBoundary>
            <ErrorBoundary fallback={windowErrorFallback}><Suspense fallback={windowFallback}><Safari/></Suspense></ErrorBoundary>
            <ErrorBoundary fallback={windowErrorFallback}><Suspense fallback={windowFallback}><ResumeWindow /></Suspense></ErrorBoundary>
            <ErrorBoundary fallback={windowErrorFallback}><Suspense fallback={windowFallback}><Finder /></Suspense></ErrorBoundary>
            <ErrorBoundary fallback={windowErrorFallback}><Suspense fallback={windowFallback}><TextFileWindow /></Suspense></ErrorBoundary>
            <ErrorBoundary fallback={windowErrorFallback}><Suspense fallback={windowFallback}><ImageFileWindow /></Suspense></ErrorBoundary>
            <ErrorBoundary fallback={windowErrorFallback}><Suspense fallback={windowFallback}><Contact /></Suspense></ErrorBoundary>
            <Home />
        </>
    );
};

const App = () => {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path={APP_ROUTES.HOME} element={<HomePage />} />
                    <Route
                        path={APP_ROUTES.BLOG_ARTICLE}
                        element={
                            <ErrorBoundary fallback={<div className="p-4 text-sm text-gray-600">{APP_MESSAGES.APP_ERROR}</div>}>
                                <Suspense fallback={<LoadingFallback message={APP_MESSAGES.LOADING_ARTICLE} />}>
                                    <BlogArticle />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />
                </Routes>
            </main>
        </Router>
    )
}
export default App;
