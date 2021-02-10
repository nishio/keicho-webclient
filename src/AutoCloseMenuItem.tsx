import React from "react";
import { MenuItem } from "@material-ui/core";
import { handleClose } from "./DropdownMenuCommon";
import { RefObject } from "react";

type Props = {
  title: string;
  onClick: () => unknown;
  ref: RefObject<HTMLLIElement>;
};

const _MenuItem = (props: Props) => {
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
};

export const AutoCloseMenuItem = React.forwardRef(_MenuItem);
