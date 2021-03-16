import { localDB } from "./localDB";

const get_record = (TalkID: string) => {
  return localDB.talks.where("TalkID").equals(TalkID);
};
export const updateTalk = (TalkID: string, text: string): Promise<unknown> => {
  return get_record(TalkID)
    .first()
    .then((x) => {
      if (x === undefined) {
        throw Error("Local record is undefined");
      }
      if (x.first_line === undefined) {
        return get_record(TalkID).modify({
          last_modified: Date.now(),
          first_line: text,
        });
      } else {
        return get_record(TalkID).modify({ last_modified: Date.now() });
      }
    });
};
