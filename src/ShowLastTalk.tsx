import React from "react";
import { useGlobal } from "reactn";
import { AutoCloseMenuItem } from "./AutoCloseMenuItem";

export const ShowLastTalk = () => {
  const [lastTalkID] = useGlobal("previousTalkID");
  const openLastLog = () => {
    window.open(`#talk=${lastTalkID}`, "_blank");
  };
  if (lastTalkID) {
    return (
      <AutoCloseMenuItem onClick={openLastLog}>
        Show Log of Last Talk
      </AutoCloseMenuItem>
    );
  } else {
    return <></>;
  }
};
