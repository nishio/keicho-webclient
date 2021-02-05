import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Menu } from "@material-ui/core";
import { openNewTalk } from "./openNewTalk";
import { openHelp } from "./openHelp";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";

export let handleClose = () => {};

export const DropdownMenuCommon = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={onClickMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        // keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <AutoCloseMenuItem onClick={openHelp}>Help</AutoCloseMenuItem>
        <AutoCloseMenuItem onClick={openNewTalk}>New Talk</AutoCloseMenuItem>
        {props.children}
      </Menu>
    </>
  );
};
