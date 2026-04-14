/**
 * @param {{ message?: string }} props
 */
const LoadingFallback = ({ message = 'Loading...' }) => {
  return (
    <div className="p-4 text-sm text-gray-500" role="status" aria-live="polite">
      {message}
    </div>
  );
};

export default LoadingFallback;
