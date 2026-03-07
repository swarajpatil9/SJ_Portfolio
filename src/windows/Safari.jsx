import React from 'react';
import { Link } from 'react-router-dom';
import WindowControls from '#components/WindowControls.jsx';
import WindowWrapper from '#hoc/WindowWrapper';
import { ChevronLeft, ChevronRight, Copy, PanelLeft, Search, Share, Plus, ShieldHalf, MoveRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    image: '/images/blog1.png',
    title: 'Getting Started with React',
    date: 'March 1, 2026',
    link: '/blog/react-started'
  },
  {
    id: 2,
    image: '/images/blog2.png',
    title: 'Building Modern Web Apps',
    date: 'February 15, 2026',
    link: '/blog/modern-web-apps'
  },
  {
    id: 3,
    image: '/images/blog3.png',
    title: 'JavaScript Tips and Tricks',
    date: 'January 20, 2026',
    link: '/blog/js-tips'
  }
];

const Safari = () => {
  return (
    <> 
        <div id="window-header">
            <WindowControls  target="safari"/>

            <PanelLeft className="ml-10 icon"/> 

            <div className="flex items-center gap-1 ml-5">
                <ChevronLeft className="icon"/>
                <ChevronRight className="icon"/>
            </div>

            <div className="flex-1 flex items-center gap-3">
                <ShieldHalf className="icon"/>

                <div className="search">
                    <Search className="icon"/>
                    <input 
                    type="text " 
                    placeholder="Search or enter website name"
                    className="flex-1"
                    />

                </div>
            </div>

            <div className="flex items-center gap-5">
                <Share className="icon"/>
                <Plus className="icon"/>
                <Copy className="icon"/>
            </div>
        </div>
        <div className="blog">
            <h2>My Developer Blog</h2>

            <div className="space-y-8">
                {blogPosts.map(({ id, image, title, date, link }) => (
                    <div key={id} className="blog-post">
                        <div className="col-span-2">
                            <img src={image} alt={title} />
                        </div>

                        <div className="content">
                            <p>{date}</p>
                            <h3>{title}</h3>
                            <Link to={link} className="text-blue-600 text-xs hover:underline flex items-center gap-3">
                                Checkout the full post <MoveRight className="icon-hover"/>
                            </Link>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
