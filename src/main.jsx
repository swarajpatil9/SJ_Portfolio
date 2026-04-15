import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { initWebVitals } from './utils/telemetry.js';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

initWebVitals();

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        import.meta.env.DEV ? undefined : (
          <div className="p-4 text-sm text-gray-600">
            The application encountered an unexpected error.
          </div>
        )
      }
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
