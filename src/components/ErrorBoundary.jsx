import React from 'react';

/**
 * @typedef {Object} ErrorBoundaryProps
 * @property {React.ReactNode} children
 * @property {React.ReactNode=} fallback
 * @property {Array<string | number | boolean | null | undefined>=} resetKeys
 */

/**
 * @typedef {Object} ErrorBoundaryState
 * @property {boolean} hasError
 * @property {Error | null} error
 * @property {string | null} componentStack
 */

class ErrorBoundary extends React.Component {
  /** @param {ErrorBoundaryProps} props */
  constructor(props) {
    super(props);
    /** @type {ErrorBoundaryState} */
    this.state = { hasError: false, error: null, componentStack: null };
  }

  /** @param {Error} error */
  static getDerivedStateFromError(error) {
    return { hasError: true, error, componentStack: null };
  }

  /** @param {Error} error @param {React.ErrorInfo} errorInfo */
  componentDidCatch(error, errorInfo) {
    this.setState({ componentStack: errorInfo?.componentStack ?? null });
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught error', error, errorInfo);
    }
  }

  /** @param {ErrorBoundaryProps} prevProps */
  componentDidUpdate(prevProps) {
    const { resetKeys = [] } = this.props;
    if (this.state.hasError && prevProps.resetKeys !== resetKeys) {
      const shouldReset = resetKeys.some((key, index) => key !== prevProps.resetKeys?.[index]);
      if (shouldReset) {
        this.setState({ hasError: false, error: null, componentStack: null });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      if (import.meta.env.DEV) {
        return (
          <div className="p-4 text-sm text-red-900 bg-red-50 border border-red-200 rounded-md m-3 max-w-3xl">
            <p className="font-semibold mb-2">Runtime error in development</p>
            <p className="mb-2">{this.state.error?.message ?? 'Unknown error'}</p>
            {this.state.error?.stack ? (
              <pre className="text-xs overflow-auto max-h-48 whitespace-pre-wrap mb-2">
                {this.state.error.stack}
              </pre>
            ) : null}
            {this.state.componentStack ? (
              <pre className="text-xs overflow-auto max-h-48 whitespace-pre-wrap">
                {this.state.componentStack}
              </pre>
            ) : null}
          </div>
        );
      }

      return <div className="p-4 text-sm">Something went wrong. Please refresh.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
