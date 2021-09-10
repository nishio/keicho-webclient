import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { DropdownMenuForNewTalk } from "./DropdownMenuForNewTalk";
import { DropdownMenuForShowLog } from "./DropdownMenuForShowLog";
import { openHelp } from "./openHelp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

export function ButtonAppBarForNewTalk() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <span onClick={openHelp}>Keichobot</span>
          </Typography>
          <DropdownMenuForNewTalk />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export function ButtonAppBarForShowLog() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <span onClick={openHelp}>Keichobot:Log</span>
          </Typography>
          <DropdownMenuForShowLog />
        </Toolbar>
      </AppBar>
    </div>
  );
}
