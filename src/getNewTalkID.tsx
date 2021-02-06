import { ERROR_ON_SERVER } from "./PRESET_MESSAGES";
import { setGlobal } from "reactn";
import { APIROOT } from "./App";
import { localDB } from "./localDB";

export const getNewTalkID = () => {
  fetch(APIROOT + "web/create", {
    mode: "cors",
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      localDB.talks
        .orderBy("id")
        .reverse()
        .limit(1)
        .toArray()
        .then((x) => {
          const previousTalkID = x[0]?.TalkID;
          if (previousTalkID !== undefined) {
            setGlobal({ TalkID: text, previousTalkID: x[0].TalkID });
          } else {
            setGlobal({ TalkID: text, previousTalkID: "" });
          }

          localDB.talks.add({ TalkID: text });
        });
    })
    .catch(() => {
      setGlobal({ logs: [ERROR_ON_SERVER], canInput: false });
    });
};
