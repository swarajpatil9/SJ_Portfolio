import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dock, Navbar, Welcome } from "#components";
import { gsap } from 'gsap';
import { Draggable } from 'react-draggable';
gsap.registerPlugin(Draggable);
import { TerminalWindow, BlogArticle, ResumeWindow } from "#windows";
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
