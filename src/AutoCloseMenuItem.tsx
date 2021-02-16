import React from "react";
import { MenuItem } from "@material-ui/core";
import { handleClose } from "./DropdownMenuCommon";
import { RefObject } from "react";
import { Ref } from "react";

type Props = {
  title: string;
  onClick: () => unknown;
  id: string;
  ref: RefObject<HTMLLIElement>;
};

const _MenuItem = (props: Props, ref: Ref<HTMLLIElement>) => {
  const { title, onClick, ...other } = props;
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
