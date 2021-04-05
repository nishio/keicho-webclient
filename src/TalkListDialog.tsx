import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { isTalk, ITalks, localDB } from "./localDB";
import { loadLogs } from "./loadLogs";
import { setGlobal, useEffect, useGlobal } from "reactn";
import { List, ListItem } from "@material-ui/core";
import { get_record } from "./updateTalk";

export const datetimeToStr = (x: number) => {
  const d = new Date(x);
  const Y = d.getFullYear();
  const M = (d.getMonth() + 1).toString().padStart(2, "0");
  const D = d.getDate().toString().padStart(2, "0");
  const H = d.getHours().toString().padStart(2, "0");
  const Min = d.getMinutes().toString().padStart(2, "0");
  const s = `${Y}-${M}-${D} ${H}:${Min}`;
  return s;
};

export const openTalkListDialog = () => {
  setGlobal({ dialog: "TalkList" });
};

export const TalkListDialog = () => {
  const [dialog, setDialog] = useGlobal("dialog");
  const open = dialog === "TalkList";
  const [talks, setTalks] = React.useState([] as ITalks[]);

  useEffect(() => {
    if (open) {
      localDB.talks
        .orderBy("last_modified")
        .reverse()
        .toArray((talks) => {
          setTalks(talks);
        });
    }
  }, [open]);

  const handleClose = () => {
    setDialog(null);
  };
  const handleExport = () => {
    const xs = talks.filter((x) => x.last_modified !== undefined);
    const data = JSON.stringify(xs);
    navigator.clipboard.writeText(data).then(() => {
      alert("copied!");
    });
  };

  const handleImport = () => {
    const data = prompt("paste exported data");
    if (data === null || data === "") {
      return;
    }
    const imported = JSON.parse(data);
    imported.forEach((x: any) => {
      if (isTalk(x)) {
        get_record(x.TalkID)
          .first()
          .then((y) => {
            if (y === undefined) {
              localDB.talks.add(x);
            } else {
              get_record(x.TalkID).modify({
                last_modified: x.last_modified,
                first_line: x.first_line,
              });
            }
          });
      }
    });
  };

  const list = talks.map((x) => {
    if (x.last_modified === undefined) {
      return null;
    }
    const showLog = () => {
      window.open(`#talk=${x.TalkID}`, "_blank");
    };
    const reenter = () => {
      loadLogs(x.TalkID);
      setGlobal({ TalkID: x.TalkID });
      handleClose();
    };
    return (
      <>
        <ListItem button key={x.TalkID}>
          <div>
            <strong>{datetimeToStr(x.last_modified!)}</strong>
            <br />
            {x.first_line}
          </div>
          <div className="talklistButtons">
            <Button onClick={showLog} variant="contained" color="primary">
              Show
            </Button>
            <Button onClick={reenter} variant="contained" color="primary">
              Continue
            </Button>
          </div>
        </ListItem>
      </>
      // <li key={x.TalkID}>
      //   <button onClick={showLog}>Show Log</button>
      //   <button onClick={reenter}>Continue</button>
      //   {datetimeToStr(x.last_modified!)}: {x.first_line}
      // </li>
    );
  });
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        fullScreen={true}
      >
        <DialogTitle id="form-dialog-title">TalkList</DialogTitle>
        <DialogContent style={{ padding: "0px 24px" }}>
          <List component="nav" className="talkList">
            {list}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExport} color="primary">
            Export(Copy)
          </Button>
          <Button onClick={handleImport} color="primary">
            Import
          </Button>

          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
