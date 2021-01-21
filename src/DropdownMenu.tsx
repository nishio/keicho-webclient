import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Menu, MenuItem } from "@material-ui/core";
import { exportForRegroup } from "./exportForRegroup";
import { TalkID } from "./NewTalk";

const showLog = () => {
  window.open(`#talk=${TalkID}`, "_blank");
};
export const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
  };
  const MyMenuItem = (props: any) => {
    const { children, onClick, ...other } = props;
    const f = () => {
      onClick();
      setAnchorEl(null);
    };
    return (
      <MenuItem onClick={f} {...other}>
        {children}
      </MenuItem>
    );
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
        <MyMenuItem onClick={exportForRegroup}>Export for Regroup</MyMenuItem>
        <MyMenuItem onClick={handleClose} disabled>
          Export for Scrapbox
        </MyMenuItem>
        <MyMenuItem onClick={handleClose} disabled>
          Export as Text
        </MyMenuItem>
        <MyMenuItem onClick={showLog}>Show log</MyMenuItem>
      </Menu>
    </>
  );
};
