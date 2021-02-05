import React from "react";
import { setGlobal, useGlobal } from "reactn";
import { loadLogs } from "./loadLogs";
import { AutoCloseMenuItem } from "./DropdownMenu";

export const ReEnterLastTalk = () => {
  const [lastTalkID] = useGlobal("previousTalkID");
  const enterLastTalk = () => {
    loadLogs(lastTalkID);
    setGlobal({ TalkID: lastTalkID });
  };
  if (lastTalkID) {
    return (
      <AutoCloseMenuItem onClick={enterLastTalk}>
        Re-enter to Last Talk
      </AutoCloseMenuItem>
    );
  } else {
    return <></>;
  }
};
