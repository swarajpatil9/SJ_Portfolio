import useWindowStore from "#store/window";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();
  
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔴 Close clicked for:', target);
    closeWindow(target);
  };

  const handleMinimize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🟡 Minimize clicked for:', target);
    minimizeWindow(target);
  };

  const handleMaximize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🟢 Maximize clicked for:', target);
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
