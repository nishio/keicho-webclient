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
      <AutoCloseMenuItem onClick={showLogInNewWindow}>
        Show URL to share
      </AutoCloseMenuItem>
      <ShowLastTalk />
      <ReEnterLastTalk />
      <AutoCloseMenuItem onClick={forceError}>Force error</AutoCloseMenuItem>
    </DropdownMenuCommon>
  );
};

const forceError = () => {
  Sentry.captureMessage("FORCED_ERROR");
};
