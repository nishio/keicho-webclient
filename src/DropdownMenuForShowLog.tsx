import React from "react";
import { DropdownMenuCommon } from "./DropdownMenuCommon";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";
import { openScrapboxDialog } from "./ScrapboxDialog";
import { openRegroupDialog } from "./RegroupDialog";

export const DropdownMenuForShowLog = () => {
  return (
    <DropdownMenuCommon>
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
