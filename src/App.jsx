import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dock, Home, Navbar, Welcome } from "#components";

const TerminalWindow = lazy(() => import('#windows/Terminal'));
const Safari = lazy(() => import('#windows/Safari'));
const ResumeWindow = lazy(() => import('#windows/Resume'));
const Finder = lazy(() => import('#windows/Finder'));
const TextFileWindow = lazy(() => import('#windows/TextFile'));
const ImageFileWindow = lazy(() => import('#windows/ImageFile'));
const Contact = lazy(() => import('#windows/Contact'));
const BlogArticle = lazy(() => import('#windows/BlogArticle'));

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Welcome />
            <Dock />
            <Suspense fallback={null}><TerminalWindow /></Suspense>
            <Suspense fallback={null}><Safari/></Suspense>
            <Suspense fallback={null}><ResumeWindow /></Suspense>
            <Suspense fallback={null}><Finder /></Suspense>
            <Suspense fallback={null}><TextFileWindow /></Suspense>
            <Suspense fallback={null}><ImageFileWindow /></Suspense>
            <Suspense fallback={null}><Contact /></Suspense>
            <Home />
        </>
    );
};

const App = () => {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog/:slug" element={<Suspense fallback={null}><BlogArticle /></Suspense>} />
                </Routes>
            </main>
        </Router>
    )
}
export default App;
