import React from "react";
import { MenuItem } from "@material-ui/core";
import { handleClose } from "./DropdownMenuCommon";

export const AutoCloseMenuItem = React.forwardRef((props: any, ref) => {
  const { children, onClick, ...other } = props;
  const f = () => {
    handleClose();
    onClick();
  };
  return (
    <MenuItem onClick={f} {...other} ref={ref}>
      {children}
    </MenuItem>
  );
});
