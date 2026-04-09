import WindowWrapper from '#hoc/WindowWrapper';
import WindowControls from '#components/WindowControls.jsx';
import useWindowStore from '#store/window.jsx';

const ImageFile = () => {
    const file = useWindowStore((state) => state.windows.imgfile.data);
    if (!file) return null;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <h2>{file.name}</h2>
            </div>

            <div className="bg-white p-4 flex items-center justify-center min-h-80">
                <img
                    src={file.imageUrl}
                    alt={file.name}
                    className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain"
                />
            </div>
        </>
    );
};

const ImageFileWindow = WindowWrapper(ImageFile, 'imgfile');

export default ImageFileWindow;
