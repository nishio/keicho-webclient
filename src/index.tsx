import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeGlobalState } from "./initializeGlobalState";
import * as Sentry from "@sentry/react";
import { initSentry } from "./initSentry";
import Config from "./Config";
import addReactNDevTools from "reactn-devtools";
import { inDeveleop } from "./Debug";

if (inDeveleop()) {
  addReactNDevTools({ trace: true, traceLimit: 25 });
}

initSentry();
initializeGlobalState();
Config.load();

ReactDOM.render(
  // <React.StrictMode>
  <Sentry.ErrorBoundary fallback="An error has occurred" showDialog>
    <App />
  </Sentry.ErrorBoundary>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
