import { setGlobal } from "reactn";
import {
  getPreviousTalkID,
  updatePreviousTalkID,
} from "./managePreviousTalkID";

// exported for test
export const gotNewTalkID = (TalkID: string): Promise<string> => {
  return getPreviousTalkID().then((previousTalkID) => {
    setGlobal({ TalkID, previousTalkID });
    updatePreviousTalkID(TalkID);
    return TalkID;
  });
};
