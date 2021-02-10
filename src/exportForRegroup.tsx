import { getGlobal } from "reactn";
import { openRegroupDialog } from "./RegroupDialog";

export const exportForRegroup = () => {
  const g = getGlobal();
  const talkObject = g.talkObject;
  if (talkObject === undefined) {
    return;
  }

  const lines: string[] = [];
  const litsk: { [key: number]: string[] } = {};
  if (talkObject.line_id_to_selected_keywords) {
    talkObject.line_id_to_selected_keywords.forEach((x: [number, string[]]) => {
      litsk[x[0]] = x[1];
    });
  }

  talkObject.log.forEach((x: [number, string], i: number) => {
    if (x[0]) {
      // is user
      lines.push(x[1]); // x.text
      lines.push(""); // blankline
    } else {
      lines.push(x[1]); // x.text
      if (litsk[i]) {
        litsk[i].forEach((kw) => {
          lines.push(kw); // selected keywords
        });
      }
    }
  });

  openRegroupDialog(lines);
};
