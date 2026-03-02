import React from 'react'
import { Dock, Navbar, Welcome } from "#components";
import { gsap } from 'gsap';
import { Draggable } from 'react-draggable';
gsap.registerPlugin(Draggable);
import { TerminalWindow } from "#windows";


const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <TerminalWindow />
        </main>
    )
}
export default App;
