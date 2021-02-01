import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextareaAutosize } from "@material-ui/core";
import { talkObject } from "./ShowLog";

export let openScrapboxDialog: any;

export const ScrapboxDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [roboIcon, setRoboIcon] = React.useState("[nisbot.icon]");
  const [humanIcon, setHumanIcon] = React.useState("[nishio.icon]");

  useEffect(() => {
    const lines: string[] = [];
    if (talkObject === undefined) {
      return;
    }
    if (!open) {
      return;
    }
    talkObject.log.forEach((x: any, i: number) => {
      const [user, text] = x;
      if (user) {
        lines.push(humanIcon + text);
      } else {
        if (text.substring(0, 2) === "\n>") {
          const [quote, t] = text.substring(2).split("\n\n");
          lines.push(roboIcon);
          lines.push(" >" + quote);
          lines.push(" " + t);
        } else {
          lines.push(roboIcon + text);
        }
      }
    });
    setText(lines.join("\n"));
  }, [roboIcon, humanIcon, open]);

  openScrapboxDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeRoboIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoboIcon(e.target.value);
  };
  const onChangeHumanIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHumanIcon(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      alert("copy ok");
      setOpen(false);
    });
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
        <DialogTitle id="form-dialog-title">Export for Scrapbox</DialogTitle>
        <DialogContent style={{ padding: "0px 24px" }}>
          {/* <DialogContentText>...</DialogContentText> */}
          <p>
            Robo Icon:{" "}
            <input
              type="text"
              defaultValue={roboIcon}
              onChange={onChangeRoboIcon}
            ></input>
          </p>
          <p>
            Human Icon:{" "}
            <input
              type="text"
              defaultValue={humanIcon}
              onChange={onChangeHumanIcon}
            ></input>
          </p>
          <TextareaAutosize
            autoFocus
            id="multiline"
            style={{ width: "100%" }}
            value={text}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopy} color="primary">
            Copy
          </Button>
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
