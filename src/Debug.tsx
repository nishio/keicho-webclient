import React from "react";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";
import * as Sentry from "@sentry/browser";
import { suppressDialog } from "./initSentry";

export const Debug = () => {
  if (inDeveleop()) {
    return <AutoCloseMenuItem onClick={debug} title="Show Log of Last Talk" />;
  }
  return null;
};
export const inDeveleop = () => {
  return process.env.NODE_ENV !== "production";
};
const debug = () => {
  // Sentry.captureMessage("FORCED_ERROR");
  Promise.resolve(0)
    .then((x) => {
      throw new TypeError("Manual Error");
    })
    .catch((e) => {
      suppressDialog();
      Sentry.captureException(e);
    });
};
