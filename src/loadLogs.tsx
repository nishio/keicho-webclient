import { setGlobal } from "reactn";
import { loadLogsFromFirestore } from "./loadLogsFromFirestore";
import { LOADING } from "./PRESET_MESSAGES";
export type Document = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

export const updateLogs = (talkObject: any) => {
  // @ts-ignore
  window.debug = talkObject; // for easy debug

  const newLogs = talkObject.log.map((x: [number, string]) => {
    return {
      user: x[0] === 1 ? true : false,
      text: x[1],
    };
  });

  return setGlobal({ logs: newLogs, talkObject: talkObject });
};

export function loadLogs(talk: string) {
  return setGlobal({ logs: LOADING })
    .then(() => {
      return loadLogsFromFirestore(talk);
    })
    .then(updateLogs)
    .catch(() => {
      // doc.data() will be undefined in this case
      return setGlobal({
        logs: [{ user: false, text: "No such document!" }],
        talkObject: null,
      });
    });
}
