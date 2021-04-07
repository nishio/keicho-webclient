import React from "react";
import { DropdownMenuCommon } from "./DropdownMenuCommon";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";
import { openShareURLDialog } from "./ShareURLDialog";
import { openRegroupDialog } from "./RegroupDialog";
import { openScrapboxDialog } from "./ScrapboxDialog";

export const DropdownMenuForNewTalk = () => {
  return (
    <DropdownMenuCommon>
      <AutoCloseMenuItem
        id="share"
        onClick={openShareURLDialog}
        title="Share..."
      />
      <AutoCloseMenuItem
        onClick={openRegroupDialog}
        title="Export for Regroup"
        id="exportForRegroup"
      />
      <AutoCloseMenuItem
        onClick={openScrapboxDialog}
        title="Export for Scrapbox"
        id="exportForScrapbox"
      />
    </DropdownMenuCommon>
  );
};
