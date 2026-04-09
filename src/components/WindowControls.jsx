import useWindowStore from "#store/window";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();
  
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeWindow(target);
  };

  const handleMinimize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    minimizeWindow(target);
  };

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
      <div 
        className="close" 
        onClick={handleClose}
        onMouseDown={(e) => e.stopPropagation()}
      />
      <div 
        className="minimize" 
        onClick={handleMinimize}
        onMouseDown={(e) => e.stopPropagation()}
      />
      <div 
        className="maximize" 
        onClick={handleMaximize}
        onMouseDown={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default WindowControls;
