import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error }> = ({ error }) => (
  <div className={styles.errorBoundary}>
    <div className={styles.content}>
      <h2>Something went wrong</h2>
      <p>We're sorry, but something unexpected happened.</p>
      {error && (
        <details className={styles.details}>
          <summary>Error Details</summary>
          <pre>{error.message}</pre>
        </details>
      )}
      <button className={styles.retry} onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  </div>
);
