import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Menu, MenuItem } from "@material-ui/core";
import { exportForRegroup } from "./exportForRegroup";
import { showLogInNewWindow } from "./showLogInNewWindow";
import { exportForScrapbox } from "./exportForScrapbox";
import { openNewTalk } from "./openNewTalk";
import { openHelp } from "./openHelp";
import { getGlobal } from "reactn";
import { ReEnterLastTalk } from "./ReEnterLastTalk";
import { ShowLastTalk } from "./ShowLastTalk";

let handleClose = () => {};

export const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const g = getGlobal();
  const TalkID = g.TalkID;
  const talkObject = g.talkObject;

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

        {talkObject
          ? [
              <AutoCloseMenuItem onClick={exportForRegroup}>
                Export for Regroup
              </AutoCloseMenuItem>,
              <AutoCloseMenuItem onClick={exportForScrapbox}>
                Export for Scrapbox
              </AutoCloseMenuItem>,
              <AutoCloseMenuItem onClick={handleClose} disabled>
                Export as Text
              </AutoCloseMenuItem>,
            ]
          : ""}
        {TalkID !== "" ? (
          <AutoCloseMenuItem onClick={showLogInNewWindow}>
            Show URL to share
          </AutoCloseMenuItem>
        ) : (
          ""
        )}
        <ShowLastTalk />
        <ReEnterLastTalk />
      </Menu>
    </>
  );
};

export const AutoCloseMenuItem = React.forwardRef((props: any, ref) => {
  const { children, onClick, ...other } = props;
  const f = () => {
    onClick();
    handleClose();
  };
  return (
    <MenuItem onClick={f} {...other} ref={ref}>
      {children}
    </MenuItem>
  );
});
