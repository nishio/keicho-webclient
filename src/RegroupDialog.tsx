import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextareaAutosize } from "@material-ui/core";
import { getGlobal, setGlobal, useGlobal } from "reactn";
import { APIROOT } from "./App";

export const openRegroupDialog = () => {
  setGlobal({ dialog: "Regroup" });
};

// const getLines = () => {
//   const g = getGlobal();
//   const talkObject = g.talkObject;
//   if (talkObject === undefined) {
//     return;
//   }

//   const lines: string[] = [];
//   const litsk: { [key: number]: string[] } = {};
//   if (talkObject.line_id_to_selected_keywords) {
//     talkObject.line_id_to_selected_keywords.forEach((x: [number, string[]]) => {
//       litsk[x[0]] = x[1];
//     });
//   }

//   talkObject.log.forEach((x: [number, string], i: number) => {
//     if (x[0]) {
//       // is user
//       lines.push(x[1]); // x.text
//       lines.push(""); // blankline
//     } else {
//       lines.push(x[1]); // x.text
//       if (litsk[i]) {
//         litsk[i].forEach((kw) => {
//           lines.push(kw); // selected keywords
//         });
//       }
//     }
//   });

//   return lines;
// };

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
  })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      console.log(text);
      alert(text);
    });
};

export const RegroupDialog = () => {
  const [dialog, setDialog] = useGlobal("dialog");
  const open = dialog === "Regroup";
  // const [text, setText] = React.useState("");

  useEffect(() => {
    if (open) {
      invoke();
      // const lines = getLines();
      // if (lines !== undefined) {
      //   setText(lines.join("\n"));
      // }
    }
  }, [open]);

  const handleClose = () => {
    setDialog(null);
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
          {/* <TextareaAutosize
            autoFocus
            id="multiline"
            style={{ width: "100%" }}
            value={text}
            data-testid="textarea-export-for-regroup"
            // rowsMin={30}
            // onChange={onChange}
          /> */}
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
