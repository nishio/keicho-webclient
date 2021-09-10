import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { setGlobal, useGlobal } from "reactn";
import { showLogInNewWindow } from "./showLogInNewWindow";

export const openShareURLDialog = () => {
  setGlobal({ dialog: "ShareURL" });
};

export const ShareURLDialog = () => {
  const [dialog, setDialog] = useGlobal("dialog");
  const open = dialog === "ShareURL";
  const [TalkID] = useGlobal("TalkID");
  const [copied, setCopied] = useState(false);

  const handleClose = () => {
    setDialog(null);
    setCopied(false);
  };
  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
    });
    window.gtag("event", "share_url_copied");
  };
  const url = `https://keicho.netlify.app/#talk=${TalkID}`;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        fullScreen={false}
      >
        <DialogTitle id="form-dialog-title">Share</DialogTitle>
        <DialogContent style={{ padding: "0 24px 24px 24px" }}>
          <input type="text" value={url} readOnly style={{ width: "100%" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={copy} color="primary">
            {copied ? "✅" : ""}Copy URL
          </Button>
          <Button onClick={showLogInNewWindow} color="primary">
            Open in new tab
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
