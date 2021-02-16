import db from "./FirestoreIO";
import { Document } from "./loadLogs";

export const loadLogsFromFirestore = (talk: string) => {
  return db
    .collection("yagokoro_env")
    .doc(talk)
    .get()
    .then((doc: Document) => {
      if (doc.exists) {
        const data = doc.data();
        if (data === undefined) {
          throw new TypeError("doc is undefined");
        }
        return JSON.parse(data.json);
      }
    });
};
