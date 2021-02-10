import React from "react";
import { exportForRegroup } from "./exportForRegroup";
import { exportForScrapbox } from "./exportForScrapbox";
import { DropdownMenuCommon } from "./DropdownMenuCommon";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";

export const DropdownMenuForShowLog = () => {
  return (
    <DropdownMenuCommon>
      <AutoCloseMenuItem
        onClick={exportForRegroup}
        title="Export for Regroup"
      />
      <AutoCloseMenuItem
        onClick={exportForScrapbox}
        title="Export for Scrapbox"
      />
    </DropdownMenuCommon>
  );
};
