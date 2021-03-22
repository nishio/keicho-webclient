import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { inDeveleop } from "./Debug";

let shownReportDialog = false;
let _suppressDialog = false;

export const suppressDialog = () => {
  _suppressDialog = true;
};

export const initSentry = () => {
  if (inDeveleop()) {
    return;
  }
  Sentry.init({
    dsn:
      "https://e4908ccb65fa4e7cb63ff1e84b55ba1f@o376998.ingest.sentry.io/5627136",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
    beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog

      if (event.exception) {
        if (_suppressDialog) {
          _suppressDialog = false;
          return event;
        }
        if (!shownReportDialog) {
          shownReportDialog = true;
          Sentry.showReportDialog({ eventId: event.event_id });
        }
      }
      return event;
    },
  });
};
