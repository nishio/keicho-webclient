import { setGlobal } from "reactn";
import db from "./FirestoreIO";
import { LOADING } from "./PRESET_MESSAGES";

export function loadLogs(talk: string) {
  setGlobal({ logs: LOADING });
  db.collection("yagokoro_env")
    .doc(talk)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        const data = doc.data();
        const talkObject = JSON.parse(data.json);
        // @ts-ignore
        window.debug = talkObject; // for easy debug

        const newLogs = talkObject.log.map((x: any) => {
          return {
            user: x[0] === 1 ? true : false,
            text: x[1],
          };
        });

        setGlobal({ logs: newLogs, talkObject: talkObject });
      } else {
        // doc.data() will be undefined in this case
        setGlobal({ logs: [{ user: false, text: "No such document!" }] });
      }
    });
}