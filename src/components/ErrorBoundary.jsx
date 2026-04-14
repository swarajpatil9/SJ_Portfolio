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
 */

class ErrorBoundary extends React.Component {
  /** @param {ErrorBoundaryProps} props */
  constructor(props) {
    super(props);
    /** @type {ErrorBoundaryState} */
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  /** @param {Error} error @param {React.ErrorInfo} errorInfo */
  componentDidCatch(error, errorInfo) {
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
        this.setState({ hasError: false });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return <div className="p-4 text-sm">Something went wrong. Please refresh.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
