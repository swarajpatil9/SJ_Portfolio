import { WINDOW_IDS } from '../config/windowIds';

import WindowControls from '#components/WindowControls.jsx';
import WindowWrapper from '#hoc/WindowWrapper';
import { useWindow } from '#store/hooks.js';

/** @typedef {import('#types/models.js').LocationNode} LocationNode */

const TextFile = () => {
  const textWindow = useWindow(WINDOW_IDS.TEXT_FILE);
  /** @type {LocationNode | null} */
  const file = textWindow?.data ?? null;
  if (!file) {
    console.warn('Missing data:', WINDOW_IDS.TEXT_FILE);
    return (
      <>
        <div id="window-header">
          <WindowControls target={WINDOW_IDS.TEXT_FILE} />
          <h2>Text Viewer</h2>
        </div>
        <div className="window-empty-state">Pick a text file from Finder to view it here.</div>
      </>
    );
  }
  const paragraphs = file.description ?? [];

  return (
    <>
      <div id="window-header">
        <WindowControls target={WINDOW_IDS.TEXT_FILE} />
        <h2>{file.name}</h2>
      </div>

      <div className="bg-white p-6 max-h-[70vh] overflow-y-auto space-y-4 text-sm text-gray-700">
        {file.image ? (
          <img
            src={file.image}
            alt={file.name}
            className="w-full max-h-64 object-cover rounded-lg"
          />
        ) : null}

        {file.subtitle ? (
          <h3 className="text-lg font-semibold text-gray-900">{file.subtitle}</h3>
        ) : null}

        {paragraphs.map((paragraph, index) => (
          <p key={`${file.id}-${index}`}>{paragraph}</p>
        ))}

        {paragraphs.length === 0 ? (
          <p className="window-empty-inline">No content is available for this file yet.</p>
        ) : null}
      </div>
    </>
  );
};

const TextFileWindow = WindowWrapper(TextFile, WINDOW_IDS.TEXT_FILE);

export default TextFileWindow;
