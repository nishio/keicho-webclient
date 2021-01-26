import React, { KeyboardEventHandler, useEffect, useState } from "react";
import Menu from "./Menu";
import { Button, IconButton, TextareaAutosize } from "@material-ui/core";
import { ChatLine } from "./ChatContents";
import { PRESET_LOGS } from "./PRESET_LOGS";
import { USE_PRESET, INITIAL_LOGS, APIROOT } from "./App";

export let TalkID: string = "";

const scrollToBottom = () => {
  const e = document.getElementById("bottom") as HTMLElement;
  const y = e.offsetTop - document.documentElement.clientHeight + 300;
  if (y > 0) {
    window.scrollTo(0, y);
  }
};

export const NewTalk = () => {
  const [logs, setLogs] = useState(USE_PRESET ? PRESET_LOGS : INITIAL_LOGS);
  const [lastKeywords, setLastKeywords] = useState([] as string[]);

  useEffect(() => {
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
  }, []);

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

    // send to server
    sendToServer(text, setLogs, setLastKeywords, newLogs);
  };

  const onChange = () => {
    setTimeout(scrollToBottom);
  };

  const NGKW_Buttons = lastKeywords.map((x) => {
    const onClick = () => {
      enter(`NGKW ${x}`);
    };
    return (
      <Button size="small" variant="contained" onClick={onClick}>
        {x}
      </Button>
    );
  });
  return (
    <div className="App">
      <Menu />
      <ChatLine logs={logs}></ChatLine>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder=""
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
      <IconButton>🙁</IconButton>
      {NGKW_Buttons}

      {/* <IconButton>🙂</IconButton>
      <Button size="small" variant="contained">
        kw3
      </Button> */}
      <hr id="bottom" />
    </div>
  );
};

function sendToServer(
  text: string,
  setLogs: React.Dispatch<
    React.SetStateAction<{ text: string; user: boolean }[]>
  >,
  setLastKeywords: any,
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
      console.log(response);
      response.json().then((data) => {
        setLogs([...newLogs, { text: data.text, user: false }]);
        setLastKeywords(data.last_kw);
      });
    });
  } else {
    // bot is sleeping
    setTimeout(sendToServer, 1000, [text, setLogs, newLogs]);
  }
}
