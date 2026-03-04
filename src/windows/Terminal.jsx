import WindowWrapper from '#hoc/WindowWrapper';
import React from 'react';
import { techStack } from '#constants';


const Terminal = () => {
  return (
    <>
        <div id ="window-header">
        <p>Window Controls</p>
        <h2>Tech Stack</h2>
        </div>

        <div className="techstack">
        <p> 
            <span className="font-bold">@swaraj % </span>
            show tech stack
        </p>
        <div className="label"> 
            <p className="w-32">Category</p>
            <p>Technologies</p>
        </div>

        <ul className = "content">
          {techStack.map(( {category, items} ) => (
            <li key={category}>
              <span className="check">✓</span>
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key = {i}>{item}{i < items.length - 1 ? "," : ""}</li>
                ))}  
              </ul>
            </li>
          ))}
        </ul>
        <div className="footnote">
          <p>
            <span className="check">✓</span> {techStack.length} of {techStack.length} stacks loaded successfully (100%)
            
          </p>
          <p>
            <span>🚩</span>
            Render time: 6ms
          </p>

        </div>
        </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal"); 

export default TerminalWindow;
