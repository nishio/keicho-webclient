import { ERROR_ON_SERVER } from "./PRESET_MESSAGES";
import { setGlobal } from "reactn";
import { APIROOT } from "./App";
import { localDB } from "./localDB";
import * as Sentry from "@sentry/browser";

export const getNewTalkID = () => {
  const transaction = Sentry.startTransaction({ name: "getNewTalkID" });
  const span = transaction.startChild({ op: "getNewTalkID" });
  fetch(APIROOT + "web/create/", {
    mode: "cors",
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      _gotNewTalkID(text).then(() => {
        Sentry.setContext("Info", { TalkID: text });
        span.finish();
        transaction.finish();
      });
    })
    .catch(() => {
      Sentry.captureMessage("ERROR_ON_SERVER: getNewTalkID");
      setGlobal({ logs: [ERROR_ON_SERVER], canInput: false });
    });
};

// exported for test
export const _gotNewTalkID = (text: string) => {
  return localDB.talks
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
};
