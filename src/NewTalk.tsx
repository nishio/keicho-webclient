import React, { KeyboardEventHandler, useEffect } from "react";
import Menu from "./Menu";
import { Button, IconButton, TextareaAutosize } from "@material-ui/core";
import { ChatLine } from "./ChatContents";
import { scrollToBottom } from "./scrollToBottom";
import {
  BOT_IS_SLEEPING,
  ERROR_ON_SERVER,
  BOT_IS_THINKING,
} from "./PRESET_MESSAGES";
import { getGlobal, setGlobal, useGlobal } from "reactn";
import { APIROOT } from "./App";

export const NewTalk = () => {
  const [logs, setLogs] = useGlobal("logs");
  const [lastKeywords] = useGlobal("lastKeywords");
  const [otherKeywords] = useGlobal("otherKeywords");
  const [canInput] = useGlobal("canInput");

  useEffect(() => {
    getNewTalkID();
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
    sendToServer(text, newLogs);
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
      <Button
        size="small"
        variant="contained"
        onClick={onClick}
        key={"NGKW" + x}
      >
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
      <Button
        size="small"
        variant="contained"
        onClick={onClick}
        key={"UPKW" + x}
      >
        👍{x}
      </Button>
    );
  });

  const InputArea = (props: { visible: Boolean }) => {
    if (props.visible) {
      return (
        <>
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
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div className="App">
      <Menu />
      <ChatLine logs={logs}></ChatLine>
      <InputArea visible={canInput} />
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
  newLogs: { text: string; user: boolean }[]
) {
  const g = getGlobal();
  if (g.TalkID !== "") {
    const data = { user: "nobody", talk: g.TalkID, text: text };
    setGlobal({ logs: [...newLogs, BOT_IS_THINKING] });

    fetch(APIROOT + "web/", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.text !== "") {
            setGlobal({
              logs: [...newLogs, { text: data.text, user: false }],
              lastKeywords: data.last_kw,
              otherKeywords: data.other_kw,
            });
          }
        });
      })
      .catch(() => {
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

const getNewTalkID = () => {
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
