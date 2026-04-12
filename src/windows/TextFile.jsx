import { WINDOW_IDS } from '../config/windowIds';

import WindowControls from '#components/WindowControls.jsx';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window.jsx';

const TextFile = () => {
  const file = useWindowStore((state) => state.windows.txtfile.data);
  if (!file) {
    return (
      <>
        <div id="window-header">
          <WindowControls target={WINDOW_IDS.TEXT_FILE} />
          <h2>Text Viewer</h2>
        </div>
        <div className="bg-white p-6 text-sm text-gray-500">No document selected.</div>
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
          <p className="text-sm text-gray-500">No content is available for this file.</p>
        ) : null}
      </div>
    </>
  );
};

const TextFileWindow = WindowWrapper(TextFile, WINDOW_IDS.TEXT_FILE);

export default TextFileWindow;
