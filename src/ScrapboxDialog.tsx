import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextareaAutosize } from "@material-ui/core";
import { setGlobal, useGlobal } from "reactn";
import { updateGlobal } from "./updateGlobal";
import Config from "./Config";

export const openScrapboxDialog = () => {
  setGlobal({ dialog: "Scrapbox" });
};

export const ScrapboxDialog = () => {
  const [dialog, setDialog] = useGlobal("dialog");
  const open = dialog === "Scrapbox";
  const [text, setText] = React.useState("");

  const [g] = useGlobal();

  const talkObject = g.talkObject;
  const roboIcon = g.config.robo_icon;
  const humanIcon = g.config.human_icon;
  const projectName = g.config.project_name;

  useEffect(() => {
    const lines: string[] = [];
    if (talkObject === undefined) {
      return;
    }
    if (!open) {
      return;
    }
    talkObject.log.forEach((x: [number, string], i: number) => {
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
  }, [roboIcon, humanIcon, open, talkObject]);

  const handleClose = () => {
    Config.save();
    setDialog(null);
  };

  const onChangeRoboIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateGlobal((g) => {
      g.config.robo_icon = e.target.value;
    });
  };
  const onChangeHumanIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateGlobal((g) => {
      g.config.human_icon = e.target.value;
    });
  };
  const onChangeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateGlobal((g) => {
      g.config.project_name = e.target.value;
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      handleClose();
    });
  };

  let title = new Date().toDateString();
  if (talkObject?.log[1] !== undefined) {
    title = talkObject!.log[1][1];
  }

  const body = "\n\n\n";
  const handleOpen = () => {
    navigator.clipboard.writeText(text).then(() => {
      window.open(
        `https://scrapbox.io/${projectName}/${title}?body=${body}`,
        "_blank"
      );
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
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <label>Robo Icon: </label>
              <input
                type="text"
                defaultValue={roboIcon}
                onChange={onChangeRoboIcon}
              ></input>
            </div>
            <div>
              <label>Human Icon: </label>
              <input
                type="text"
                defaultValue={humanIcon}
                onChange={onChangeHumanIcon}
              ></input>
            </div>
            <div>
              <Button onClick={handleCopy} color="primary">
                Copy Text
              </Button>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <label>Project Name: </label>
              <input
                type="text"
                defaultValue={projectName}
                onChange={onChangeProjectName}
              ></input>
            </div>
            <div>
              <Button onClick={handleOpen} color="primary">
                Copy and Open Scrapbox
              </Button>
            </div>
          </div>

          <TextareaAutosize
            autoFocus
            id="multiline"
            style={{ width: "100%" }}
            value={text}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
