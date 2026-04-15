import { WINDOW_IDS } from '../config/windowIds';

import WindowControls from '#components/WindowControls.jsx';
import { gallery, photosLinks } from '#constants/index.js';
import WindowWrapper from '#hoc/WindowWrapper';

const Photos = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target={WINDOW_IDS.PHOTOS} />
        <h2>Gallery</h2>
      </div>

      <div className="bg-white flex h-full">
        <aside className="sidebar">
          <h2>Collections</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt="" aria-hidden="true" />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </aside>

        <div className="gallery flex-1">
          {gallery.length === 0 ? (
            <div className="window-empty-state">No photos are available right now.</div>
          ) : (
            <ul>
              {gallery.map(({ id, img }) => (
                <li key={id}>
                  <img src={img} alt={`Gallery item ${id}`} loading="lazy" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, WINDOW_IDS.PHOTOS);
export default PhotosWindow;
