import WindowWrapper from '#hoc/WindowWrapper';
import WindowControls from '#components/WindowControls.jsx';
import useWindowStore from '#store/window.jsx';

const TextFile = () => {
    const { windows } = useWindowStore();
    const file = windows.txtfile.data;
    if (!file) return null;
    const paragraphs = file.description ?? [];

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
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
            </div>
        </>
    );
};

const TextFileWindow = WindowWrapper(TextFile, 'txtfile');

export default TextFileWindow;
