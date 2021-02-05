import React from "react";
import { showLogInNewWindow } from "./showLogInNewWindow";
import { ReEnterLastTalk } from "./ReEnterLastTalk";
import { ShowLastTalk } from "./ShowLastTalk";
import { DropdownMenuCommon } from "./DropdownMenuCommon";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";

export const DropdownMenuForNewTalk = () => {
  return (
    <DropdownMenuCommon>
      <AutoCloseMenuItem onClick={showLogInNewWindow}>
        Show URL to share
      </AutoCloseMenuItem>
      <ShowLastTalk />
      <ReEnterLastTalk />
    </DropdownMenuCommon>
  );
};
