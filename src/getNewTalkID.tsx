import { ERROR_ON_SERVER } from "./PRESET_MESSAGES";
import { setGlobal } from "reactn";
import { APIROOT } from "./App";

export const getNewTalkID = () => {
  fetch(APIROOT + "web/create", {
    mode: "cors",
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      setGlobal({ TalkID: text });
    })
    .catch(() => {
      setGlobal({ logs: [ERROR_ON_SERVER], canInput: false });
    });
};
