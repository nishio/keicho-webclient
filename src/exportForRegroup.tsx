import { openRegroupDialog } from "./RegroupDialog";
import { talkObject } from "./ShowLog";

export const exportForRegroup = () => {
  const lines: string[] = [];
  talkObject.log.forEach((x: any, i: number) => {
    console.log(i, x);
    if (x[0]) {
      // is user
      lines.push(x[1]); // x.text
    }
  });
  const keywords: Set<string> = new Set();
  talkObject.used_qid_and_words.forEach((x: any, i: number) => {
    if (x.length >= 2) {
      x[1].forEach((x: string) => {
        keywords.add(x);
      });
    }
  });

  openRegroupDialog(lines.concat(Array.from(keywords)));
};
