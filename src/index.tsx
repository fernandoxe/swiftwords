import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { serviceWorkerRegister } from './serviceWorkerRegister';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  release: process.env.REACT_APP_VERSION,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegister();