import { WINDOW_IDS } from '../config/windowIds';

import WindowControls from '#components/WindowControls.jsx';
import WindowWrapper from '#hoc/WindowWrapper';
import { useWindow } from '#store/hooks.js';

/** @typedef {import('#types/models.js').LocationNode} LocationNode */

const ImageFile = () => {
  const imageWindow = useWindow(WINDOW_IDS.IMAGE_FILE);
  /** @type {LocationNode | null} */
  const file = imageWindow?.data ?? null;
  if (!file) {
    console.warn('Missing data:', WINDOW_IDS.IMAGE_FILE);
    return (
      <>
        <div id="window-header">
          <WindowControls target={WINDOW_IDS.IMAGE_FILE} />
          <h2>Image Viewer</h2>
        </div>
        <div className="window-empty-state">Pick an image file from Finder to preview it here.</div>
      </>
    );
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target={WINDOW_IDS.IMAGE_FILE} />
        <h2>{file.name}</h2>
      </div>

      <div className="bg-white p-4 flex items-center justify-center min-h-80">
        <img
          src={file.imageUrl}
          alt={file.name}
          className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain"
          loading="lazy"
          /** @param {React.SyntheticEvent<HTMLImageElement>} event */
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        {!file.imageUrl ? (
          <p className="window-empty-inline">Image source is unavailable for this file.</p>
        ) : null}
      </div>
    </>
  );
};

const ImageFileWindow = WindowWrapper(ImageFile, WINDOW_IDS.IMAGE_FILE);

export default ImageFileWindow;
