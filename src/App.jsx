import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dock, Home, Navbar, Welcome } from "#components";
import { TerminalWindow, BlogArticle, ResumeWindow, Finder, TextFileWindow, ImageFileWindow, Contact } from "#windows";
import Safari from '#windows/Safari';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Welcome />
            <Dock />
            <TerminalWindow />
            <Safari/>
            <ResumeWindow />
            <Finder />
            <TextFileWindow />
            <ImageFileWindow />
            <Contact />
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
                    <Route path="/blog/:slug" element={<BlogArticle />} />
                </Routes>
            </main>
        </Router>
    )
}
export default App;
