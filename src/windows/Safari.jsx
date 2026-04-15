import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Search,
  Share,
  Plus,
  ShieldHalf,
  MoveRight,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '../config/routes';
import { WINDOW_IDS } from '../config/windowIds';

import WindowControls from '#components/WindowControls.jsx';
import { blogCatalog } from '#constants/blogData.js';
import WindowWrapper from '#hoc/WindowWrapper';

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target={WINDOW_IDS.SAFARI} />

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex items-center gap-3">
          <ShieldHalf className="icon" />

          <div className="search">
            <Search className="icon" />
            <input type="text" placeholder="Search or enter website name" className="flex-1" />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>
      <div className="blog">
        <h2>My Developer Blog</h2>

        {blogCatalog.length === 0 ? (
          <p className="text-sm text-gray-500">No blog posts are available right now.</p>
        ) : (
          <div className="space-y-8">
            {blogCatalog.map(({ slug, image, title, date }) => (
              <div key={slug} className="blog-post">
                <div className="col-span-2">
                  <img src={image} alt={title} loading="lazy" />
                </div>

                <div className="content">
                  <p>{date}</p>
                  <h3>{title}</h3>
                  <Link
                    to={APP_ROUTES.BLOG_ARTICLE.replace(':slug', slug)}
                    className="text-blue-600 text-xs hover:underline flex items-center gap-3"
                  >
                    Checkout the full post <MoveRight className="icon-hover" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, WINDOW_IDS.SAFARI);

export default SafariWindow;
