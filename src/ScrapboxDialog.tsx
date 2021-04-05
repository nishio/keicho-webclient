import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
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

  const url = `https://keicho.netlify.app/#talk=${g.TalkID}`;
  const body = encodeURIComponent(`\n\n\n${url}`);
  const handleOpen = () => {
    const title = (document.getElementById("title") as HTMLInputElement).value;
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
        className="scrapbox-dialog"
      >
        <DialogTitle id="form-dialog-title">Export for Scrapbox</DialogTitle>
        <DialogContent style={{ padding: "0px 24px" }}>
          {/* <DialogContentText>...</DialogContentText> */}
          <div className="dialog-inputs">
            <div className="input-icon">
              <TextField
                label="Robot Icon"
                defaultValue={roboIcon}
                onChange={onChangeRoboIcon}
                variant="outlined"
              />
            </div>
            <div className="input-icon">
              <TextField
                label="Human Icon"
                defaultValue={humanIcon}
                onChange={onChangeHumanIcon}
                variant="outlined"
              />
            </div>
            <div className="button-copy">
              <Button onClick={handleCopy} color="primary" variant="contained">
                Copy
              </Button>
            </div>
          </div>

          <div className="dialog-inputs">
            <div className="input-title">
              <TextField
                label="Title"
                defaultValue={title}
                onChange={onChangeProjectName}
                variant="outlined"
                id="title"
              />
            </div>
            <div className="input-project">
              <TextField
                label="Project"
                defaultValue={projectName}
                onChange={onChangeProjectName}
                variant="outlined"
              />
            </div>
            <div className="button-open-scrapbox">
              <Button onClick={handleOpen} color="primary" variant="contained">
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
