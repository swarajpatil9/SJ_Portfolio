import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught error', error, errorInfo);
    }
  }

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
