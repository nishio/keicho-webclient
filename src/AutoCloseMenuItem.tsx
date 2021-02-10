import React from "react";
import { MenuItem } from "@material-ui/core";
import { handleClose } from "./DropdownMenuCommon";
import { RefObject } from "react";

type PropsType = {
  title: string;
  onClick: () => unknown;
  ref: RefObject<HTMLLIElement>;
};

export const AutoCloseMenuItem = React.forwardRef((props: PropsType) => {
  const { title, onClick, ref, ...other } = props;
  const f = () => {
    handleClose();
    onClick();
  };
  return (
    <MenuItem onClick={f} {...other} ref={ref}>
      {title}
    </MenuItem>
  );
});
