import useWindowStore from '#store/window';

/** @typedef {import('#types/models.js').WindowId} WindowId */

/**
 * @param {{ target: WindowId }} props
 */
const WindowControls = ({ target }) => {

  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const maximizeWindow = useWindowStore((state) => state.maximizeWindow);

  /** @param {React.MouseEvent<HTMLDivElement>} e */
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeWindow(target);
  };

  /** @param {React.MouseEvent<HTMLDivElement>} e */
  const handleMinimize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    minimizeWindow(target);
  };

  /** @param {React.MouseEvent<HTMLDivElement>} e */
  const handleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    maximizeWindow(target);
  };

  return (
    <div
      id="window-controls"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="close" onClick={handleClose} onMouseDown={(e) => e.stopPropagation()} />
      <div className="minimize" onClick={handleMinimize} onMouseDown={(e) => e.stopPropagation()} />
      <div className="maximize" onClick={handleMaximize} onMouseDown={(e) => e.stopPropagation()} />
    </div>
  );
};

export default WindowControls;
