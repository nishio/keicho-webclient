import React, { KeyboardEventHandler, useEffect } from "react";
import Menu from "./Menu";
import { Button, IconButton, TextareaAutosize } from "@material-ui/core";
import { ChatLine } from "./ChatContents";
import { scrollToBottom } from "./scrollToBottom";
import { setGlobal, useGlobal } from "reactn";
import { getNewTalkID } from "./getNewTalkID";
import { sendToServer } from "./sendToServer";
import { onClickNG } from "./onClickNG";

export const NewTalk = () => {
  const [logs] = useGlobal("logs");
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
    setGlobal({ logs: newLogs });
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
