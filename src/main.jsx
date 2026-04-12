import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={<div className="p-4 text-sm text-gray-600">The application encountered an unexpected error.</div>}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
