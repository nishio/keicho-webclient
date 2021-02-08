import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeGlobalState } from "./initializeGlobalState";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn:
    "https://e4908ccb65fa4e7cb63ff1e84b55ba1f@o376998.ingest.sentry.io/5627136",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

initializeGlobalState();
ReactDOM.render(
  // <React.StrictMode>
  <Sentry.ErrorBoundary showDialog>
    <App />
  </Sentry.ErrorBoundary>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
