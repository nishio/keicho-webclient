import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Menu, MenuItem } from "@material-ui/core";
import { exportForRegroup } from "./exportForRegroup";
import { showLog } from "./showLog.1";
import { TalkID } from "./NewTalk";
import { exportForScrapbox } from "./exportForScrapbox";
import { openNewTalk } from "./openNewTalk";
import { openHelp } from "./openHelp";
import { talkObject } from "./ShowLog";

export const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
  };
  const MyMenuItem = React.forwardRef((props: any, ref) => {
    const { children, onClick, ...other } = props;
    const f = () => {
      onClick();
      setAnchorEl(null);
    };
    return (
      <MenuItem onClick={f} {...other} ref={ref}>
        {children}
      </MenuItem>
    );
  });
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
        <MyMenuItem onClick={openHelp}>Help</MyMenuItem>
        <MyMenuItem onClick={openNewTalk}>New Talk</MyMenuItem>

        {talkObject
          ? [
              <MyMenuItem onClick={exportForRegroup}>
                Export for Regroup
              </MyMenuItem>,
              <MyMenuItem onClick={exportForScrapbox}>
                Export for Scrapbox
              </MyMenuItem>,
              <MyMenuItem onClick={handleClose} disabled>
                Export as Text
              </MyMenuItem>,
            ]
          : ""}
        {TalkID !== "" ? (
          <MyMenuItem onClick={showLog}>Show URL to share</MyMenuItem>
        ) : (
          ""
        )}
      </Menu>
    </>
  );
};
