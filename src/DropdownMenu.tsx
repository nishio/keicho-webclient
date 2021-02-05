import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Menu, MenuItem } from "@material-ui/core";
import { exportForRegroup } from "./exportForRegroup";
import { showLogInNewWindow } from "./showLogInNewWindow";
import { exportForScrapbox } from "./exportForScrapbox";
import { openNewTalk } from "./openNewTalk";
import { openHelp } from "./openHelp";
import { getGlobal, setGlobal, useGlobal } from "reactn";
import { loadLogs } from "./loadLogs";

export const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const g = getGlobal();
  const TalkID = g.TalkID;
  const talkObject = g.talkObject;

  const onClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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

  const VisitLastTalk = () => {
    const [lastTalkID] = useGlobal("previousTalkID");
    const openLastLog = () => {
      window.open(`#talk=${lastTalkID}`, "_blank");
    };
    const enterLastTalk = () => {
      loadLogs(lastTalkID);
      setGlobal({ TalkID: lastTalkID });
    };
    if (lastTalkID) {
      return (
        <>
          <MyMenuItem onClick={openLastLog}>Show Log of Last Talk</MyMenuItem>
          <MyMenuItem onClick={enterLastTalk}>Re-enter to Last Talk</MyMenuItem>
        </>
      );
    } else {
      return <></>;
    }
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
          <MyMenuItem onClick={showLogInNewWindow}>
            Show URL to share
          </MyMenuItem>
        ) : (
          ""
        )}
        <VisitLastTalk />
      </Menu>
    </>
  );
};
