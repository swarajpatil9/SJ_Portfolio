import WindowWrapper from '#hoc/WindowWrapper';
import React from 'react'

const Terminal = () => {
  return (
    <>
        <div id ="window-header">
        <p>Window Controls</p>
        <h2>Tech Stack</h2>
        </div>

        <div>
        <p> 
            <span className="font-bold">@swaraj %</span>
            show tech stack
        </p>
        </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal"); 

export default TerminalWindow;
