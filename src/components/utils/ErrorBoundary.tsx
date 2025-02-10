import React, { ErrorInfo } from 'react';
import { HeaderText } from '~components/shared/text';
import YaMetricaService from '~services/YandexMetrica.service';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    YaMetricaService.logError('Component Error:', error.message);
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <HeaderText style={{ paddingTop: 100 }}>Something went wrong.</HeaderText>;
    }
    // @ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
