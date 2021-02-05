import React from "react";
import { exportForRegroup } from "./exportForRegroup";
import { exportForScrapbox } from "./exportForScrapbox";
import { DropdownMenuCommon } from "./DropdownMenuCommon";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";

let handleClose = () => {};

export const DropdownMenuForShowLog = () => {
  return (
    <DropdownMenuCommon>
      <AutoCloseMenuItem onClick={exportForRegroup}>
        Export for Regroup
      </AutoCloseMenuItem>
      <AutoCloseMenuItem onClick={exportForScrapbox}>
        Export for Scrapbox
      </AutoCloseMenuItem>
      <AutoCloseMenuItem onClick={handleClose} disabled>
        Export as Text
      </AutoCloseMenuItem>
    </DropdownMenuCommon>
  );
};
