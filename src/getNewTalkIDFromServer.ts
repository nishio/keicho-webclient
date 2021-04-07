import { ERROR_ON_SERVER } from "./PRESET_MESSAGES";
import { setGlobal } from "reactn";
import { APIROOT } from "./App";
import * as Sentry from "@sentry/browser";
import { get_mode } from "./get_mode";

export const getNewTalkIDFromServer = (
  gotNewTalkID: (TalkID: string) => Promise<string>
): Promise<void> => {
  const transaction = Sentry.startTransaction({ name: "getNewTalkID" });
  const span = transaction.startChild({ op: "getNewTalkID" });
  const mode = get_mode();

  return fetch(APIROOT + `web/create/?mode=${mode}`, {
    mode: "cors",
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((TalkID: string) => {
      return gotNewTalkID(TalkID);
    })
    .then((TalkID: string) => {
      Sentry.setContext("Info", { TalkID });
      span.finish();
      transaction.finish();
    })
    .catch(() => {
      Sentry.captureMessage("ERROR_ON_SERVER: getNewTalkID");
      setGlobal({ logs: [ERROR_ON_SERVER], canInput: false });
    });
};
