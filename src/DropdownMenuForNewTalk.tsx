import React from "react";
import { showLogInNewWindow } from "./showLogInNewWindow";
import { ReEnterLastTalk } from "./ReEnterLastTalk";
import { ShowLastTalk } from "./ShowLastTalk";
import { DropdownMenuCommon } from "./DropdownMenuCommon";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";
import * as Sentry from "@sentry/browser";
import { suppressDialog } from "./initSentry";

export const DropdownMenuForNewTalk = () => {
  return (
    <DropdownMenuCommon>
      <AutoCloseMenuItem
        id="showLogInNewWindow"
        onClick={showLogInNewWindow}
        title="Show URL to share"
      />
      <ShowLastTalk />
      <ReEnterLastTalk />
      <AutoCloseMenuItem
        id="forceError"
        onClick={forceError}
        title="Force error"
      />
    </DropdownMenuCommon>
  );
};

const forceError = () => {
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
