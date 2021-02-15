import {
  BOT_IS_SLEEPING,
  ERROR_ON_SERVER,
  BOT_IS_THINKING,
} from "./PRESET_MESSAGES";
import { getGlobal, setGlobal } from "reactn";
import { APIROOT } from "./App";
import * as Sentry from "@sentry/browser";

type TLogs = { text: string; user: boolean }[];

export function sendToServer(text: string, newLogs: TLogs) {
  const g = getGlobal();
  if (g.TalkID !== "") {
    const data = { user: "nobody", talk: g.TalkID, text: text };
    setGlobal({ logs: [...newLogs, BOT_IS_THINKING] });

    const transaction = Sentry.startTransaction({ name: "getNewTalkID" });
    const span = transaction.startChild({ op: "getNewTalkID" });

    fetch(APIROOT + "web/", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.text !== "") {
          return _gotResponse(newLogs, data);
        }
      })
      .then(() => {
        span.finish();
        transaction.finish();
      })
      .catch(() => {
        Sentry.captureMessage("ERROR_ON_SERVER");
        setGlobal({
          logs: [...newLogs, ERROR_ON_SERVER],
          canInput: false,
        });
      });
  } else {
    // bot is sleeping
    setGlobal({ logs: [...newLogs, BOT_IS_SLEEPING] });

    setTimeout(() => {
      sendToServer(text, newLogs);
    }, 1000);
  }
}

export const _gotResponse = (newLogs: TLogs, data: any) => {
  return setGlobal({
    logs: [...newLogs, { text: data.text, user: false }],
    lastKeywords: data.last_kw,
    otherKeywords: data.other_kw,
  });
};
