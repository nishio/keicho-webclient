import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextareaAutosize } from "@material-ui/core";

export let openRegroupDialog: any;

export const RegroupDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  openRegroupDialog = (lines: string[]) => {
    setText(lines.join("\n"));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        fullScreen={true}
      >
        <DialogTitle id="form-dialog-title">Export for Regroup</DialogTitle>
        <DialogContent style={{ padding: "0px 24px" }}>
          {/* <DialogContentText>...</DialogContentText> */}
          <TextareaAutosize
            autoFocus
            id="multiline"
            style={{ width: "100%" }}
            value={text}
            // rowsMin={30}
            // onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary" disabled>
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
