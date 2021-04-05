import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getGlobal, setGlobal, useGlobal } from "reactn";
import { APIROOT } from "./App";

export const openRegroupDialog = () => {
  setGlobal({ dialog: "Regroup" });
};

const invoke = () => {
  const g = getGlobal();
  const data = { talk: g.TalkID };

  return fetch(APIROOT + "regroup/create/", {
    mode: "cors",
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.text();
  });
};

export const RegroupDialog = () => {
  const [dialog, setDialog] = useGlobal("dialog");
  const open = dialog === "Regroup";
  // const [text, setText] = React.useState("");
  const [mapid, setMapID] = useState("");

  useEffect(() => {
    setMapID("");
    if (open) {
      invoke().then((mapid) => {
        setMapID(mapid);
      });
    }
  }, [open]);

  const handleClose = () => {
    setDialog(null);
  };

  const url = `https://regroup.netlify.app/#/key=${mapid}`;
  const handleOpen = () => {
    window.open(url, "_blank");
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Export for Regroup</DialogTitle>
        <DialogContent style={{ padding: "0px 24px" }}>
          {!mapid ? "generating" : null}
          {mapid ? url : null}
        </DialogContent>
        <DialogActions>
          {mapid ? (
            <Button onClick={handleOpen} color="primary">
              Open URL
            </Button>
          ) : null}

          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
