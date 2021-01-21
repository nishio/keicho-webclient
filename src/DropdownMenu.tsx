import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export const DropdownMenu = () => {
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
