import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { composeProviders } from "./composeProviders";

const ReduxProvider = ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>;

const AppThemeProvider = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

const AppErrorBoundary = ({ children }: { children: ReactNode }) => <ErrorBoundary>{children}</ErrorBoundary>;

export const AppProviders = composeProviders(AppErrorBoundary, ReduxProvider, AppThemeProvider);
