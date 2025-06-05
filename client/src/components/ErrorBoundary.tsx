import { Component } from "react";
import type { ReactNode } from "react";

import { GlobalErrorFallback } from "./GlobalErrorFallBack";

type Props = {
  children: ReactNode;
};
type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? <GlobalErrorFallback /> : this.props.children;
  }
}
