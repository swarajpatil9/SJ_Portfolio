import { useWindowActions } from '#store/hooks';

/** @typedef {import('#types/models.js').WindowId} WindowId */

/**
 * @param {{ target: WindowId }} props
 */
const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowActions();

  /** @param {React.MouseEvent<HTMLButtonElement>} e */
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeWindow(target);
  };

  /** @param {React.MouseEvent<HTMLButtonElement>} e */
  const handleMinimize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    minimizeWindow(target);
  };

  /** @param {React.MouseEvent<HTMLButtonElement>} e */
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
      <button
        type="button"
        className="close"
        aria-label="Close window"
        title="Close"
        onClick={handleClose}
        onMouseDown={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="minimize"
        aria-label="Minimize window"
        title="Minimize"
        onClick={handleMinimize}
        onMouseDown={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="maximize"
        aria-label="Maximize window"
        title="Maximize"
        onClick={handleMaximize}
        onMouseDown={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default WindowControls;
