import { openRegroupDialog } from "./RegroupDialog";
import { talkObject } from "./ShowLog";

export const exportForRegroup = () => {
  const lines: string[] = [];
  const litsk: { [key: number]: string[] } = {};
  if (talkObject.line_id_to_selected_keywords) {
    talkObject.line_id_to_selected_keywords.forEach((x: [number, string[]]) => {
      litsk[x[0]] = x[1];
    });
  }

  talkObject.log.forEach((x: any, i: number) => {
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
