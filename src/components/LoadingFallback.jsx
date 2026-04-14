import { useEffect, useState } from 'react';

/**
 * @param {{ message?: string }} props
 */
const LoadingFallback = ({ message = 'Loading...' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};

export default LoadingFallback;
