import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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

const DropdownMenu = () => {
  const onClickMenu = () => {
    alert("no menu yet");
  };

  return (
    <IconButton
      edge="end"
      color="inherit"
      aria-label="menu"
      onClick={onClickMenu}
    >
      <MenuIcon />
    </IconButton>
  );
};
export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Keicho
          </Typography>
          <DropdownMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}
