import React from "react";
import { setGlobal, useGlobal } from "reactn";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";
import { loadLogs } from "./loadLogs";

export const ReEnterLastTalk = () => {
  const [lastTalkID] = useGlobal("previousTalkID");
  const enterLastTalk = () => {
    loadLogs(lastTalkID);
    setGlobal({ TalkID: lastTalkID });
  };
  if (lastTalkID) {
    return (
      <AutoCloseMenuItem
        onClick={enterLastTalk}
        title="Re-enter to Last Talk"
      />
    );
  }
  return null;
};
