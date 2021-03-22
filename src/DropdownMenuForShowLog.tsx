import React from "react";
import { exportForRegroup } from "./exportForRegroup";
import { DropdownMenuCommon } from "./DropdownMenuCommon";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";
import { openScrapboxDialog } from "./ScrapboxDialog";

export const DropdownMenuForShowLog = () => {
  return (
    <DropdownMenuCommon>
      <AutoCloseMenuItem
        onClick={exportForRegroup}
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
