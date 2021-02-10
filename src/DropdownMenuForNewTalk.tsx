import React from "react";
import { showLogInNewWindow } from "./showLogInNewWindow";
import { ReEnterLastTalk } from "./ReEnterLastTalk";
import { ShowLastTalk } from "./ShowLastTalk";
import { DropdownMenuCommon } from "./DropdownMenuCommon";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";
import * as Sentry from "@sentry/browser";

export const DropdownMenuForNewTalk = () => {
  return (
    <DropdownMenuCommon>
      <AutoCloseMenuItem
        onClick={showLogInNewWindow}
        title="Show URL to share"
      />
      <ShowLastTalk />
      <ReEnterLastTalk />
      <AutoCloseMenuItem onClick={forceError} title="Force error" />
    </DropdownMenuCommon>
  );
};

const forceError = () => {
  Sentry.captureMessage("FORCED_ERROR");
};
