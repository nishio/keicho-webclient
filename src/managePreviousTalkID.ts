import { localDB } from "./localDB";

export const getPreviousTalkID = (): Promise<string> => {
  return localDB.talks
    .orderBy("id")
    .reverse()
    .limit(1)
    .toArray()
    .then((x) => {
      if (x[0] !== undefined) {
        return Promise.resolve(x[0].TalkID);
      } else {
        return Promise.resolve("");
      }
    });
};
export const updatePreviousTalkID = (currentTalkID: string): void => {
  localDB.talks.add({ TalkID: currentTalkID });
};
