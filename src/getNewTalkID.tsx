import { setGlobal } from "reactn";
import {
  getPreviousTalkID,
  updatePreviousTalkID,
} from "./managePreviousTalkID";
import { getNewTalkIDFromServer } from "./getNewTalkIDFromServer";

export const getNewTalkID = () => {
  getNewTalkIDFromServer(gotNewTalkID);
};

// exported for test
export const gotNewTalkID = (TalkID: string): Promise<string> => {
  return getPreviousTalkID().then((previousTalkID) => {
    setGlobal({ TalkID, previousTalkID });
    updatePreviousTalkID(TalkID);
    return TalkID;
  });
};
