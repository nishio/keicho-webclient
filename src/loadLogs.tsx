import { setGlobal } from "reactn";
import db from "./FirestoreIO";
import { LOADING } from "./PRESET_MESSAGES";
type Document = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

export function loadLogs(talk: string) {
  setGlobal({ logs: LOADING });
  db.collection("yagokoro_env")
    .doc(talk)
    .get()
    .then((doc: Document) => {
      if (doc.exists) {
        const data = doc.data();
        if (data === undefined) {
          throw new TypeError("doc is undefined");
        }
        const talkObject = JSON.parse(data.json);
        // @ts-ignore
        window.debug = talkObject; // for easy debug

        const newLogs = talkObject.log.map((x: [number, string]) => {
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
