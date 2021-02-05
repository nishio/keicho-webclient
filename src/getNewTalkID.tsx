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
          setGlobal({ TalkID: text, previousTalkID: x[0].TalkID });
          localDB.talks.add({ TalkID: text });
        });
    })
    .catch(() => {
      setGlobal({ logs: [ERROR_ON_SERVER], canInput: false });
    });
};