import React from "react";
import { DropdownMenuCommon } from "./DropdownMenuCommon";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";
import { openShareURLDialog } from "./ShareURLDialog";
import { Debug } from "./Debug";

export const DropdownMenuForNewTalk = () => {
  return (
    <DropdownMenuCommon>
      <AutoCloseMenuItem
        id="share"
        onClick={openShareURLDialog}
        title="Share..."
      />
      {/* <ShowLastTalk /> */}
      {/* <ReEnterLastTalk /> */}
      <Debug />
    </DropdownMenuCommon>
  );
};
