import React, { KeyboardEventHandler, useEffect, useState } from "react";
import Menu from "./Menu";
import { Button, IconButton, TextareaAutosize } from "@material-ui/core";
import { ChatLine } from "./ChatContents";
import { PRESET_LOGS } from "./PRESET_LOGS";
import { USE_PRESET, INITIAL_LOGS, APIROOT } from "./App";
import { scrollToBottom } from "./scrollToBottom";
import { BOT_IS_SLEEPING } from "./BOT_IS_SLEEPING";

export let TalkID: string = "";
export const NewTalk = () => {
  const [logs, setLogs] = useState(USE_PRESET ? PRESET_LOGS : INITIAL_LOGS);
  const [lastKeywords, setLastKeywords] = useState([] as string[]);
  const [otherKeywords, setOtherKeywords] = useState([] as string[]);

  useEffect(getNewTalkID, []);

  // when log changed, scroll to bottom after the component rendered
  useEffect(scrollToBottom, [logs]);

  const onKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLTextAreaElement;
      const text = target.value;
      target.value = "";
      e.preventDefault();
      if (text !== "") {
        enter(text);
      }
    }
  };

  const enter = (text: string) => {
    const newLogs = [...logs, { text: text, user: true }];
    setLogs(newLogs);
    sendToServer(text, setLogs, setLastKeywords, setOtherKeywords, newLogs);
  };

  const onChange = () => {
    setTimeout(scrollToBottom);
  };

  const NGKW_Buttons = lastKeywords.map((x) => {
    const onClick = () => {
      enter(`NGKW ${x}`);
      const t = document.getElementById("textarea") as HTMLTextAreaElement;
      t.focus();
    };
    return (
      <Button size="small" variant="contained" onClick={onClick}>
        🙁{x}
      </Button>
    );
  });
  const UPKW_Buttons = otherKeywords.slice(0, 3).map((x) => {
    const onClick = () => {
      enter(`UPKW ${x}`);
      const t = document.getElementById("textarea") as HTMLTextAreaElement;
      t.focus();
    };
    return (
      <Button size="small" variant="contained" onClick={onClick}>
        👍{x}
      </Button>
    );
  });

  return (
    <div className="App">
      <Menu />
      <ChatLine logs={logs}></ChatLine>
      <TextareaAutosize
        aria-label="textarea"
        placeholder=""
        onKeyPress={onKeyPress}
        onChange={onChange}
        id="textarea"
      />
      <IconButton onClick={onClickNG}>🙁</IconButton>
      {NGKW_Buttons}
      {UPKW_Buttons}
      {/* <IconButton>🙂</IconButton>
      <Button size="small" variant="contained">
        kw3
      </Button> */}
      <hr id="bottom" />
    </div>
  );
};

const onClickNG = () => {
  const t = document.getElementById("textarea") as HTMLTextAreaElement;
  const start = t.selectionStart;
  const end = t.selectionEnd;
  t.value = t.value.substring(0, start) + "🙁" + t.value.substring(end);
  t.focus();
};
function sendToServer(
  text: string,
  setLogs: React.Dispatch<
    React.SetStateAction<{ text: string; user: boolean }[]>
  >,
  setLastKeywords: any,
  setOtherKeywords: any,
  newLogs: { text: string; user: boolean }[]
) {
  if (TalkID !== "") {
    const data = { user: "nobody", talk: TalkID, text: text };
    fetch(APIROOT + "web/", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        if (data.text !== "") {
          setLogs([...newLogs, { text: data.text, user: false }]);
          setLastKeywords(data.last_kw);
          setOtherKeywords(data.other_kw);
        }
      });
    });
  } else {
    // bot is sleeping
    setLogs([...newLogs, BOT_IS_SLEEPING]);

    setTimeout(() => {
      sendToServer(text, setLogs, setLastKeywords, setOtherKeywords, newLogs);
    }, 1000);
  }
}

const getNewTalkID = () => {
  fetch(APIROOT + "web/create", {
    mode: "cors",
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      TalkID = text;
    });
};
