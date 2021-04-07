import React, { KeyboardEventHandler, useEffect } from "react";
import { ButtonAppBarForNewTalk } from "./Menu";
import { Button, IconButton, TextareaAutosize } from "@material-ui/core";
import { ChatLine } from "./ChatContents";
import { scrollToBottom } from "./scrollToBottom";
import { setGlobal, useGlobal } from "reactn";
import { gotNewTalkID } from "./getNewTalkID";
import { sendToServer } from "./sendToServer";
import { onClickGood, onClickNG } from "./onClickNG";
import { focusOnTextarea } from "./focusOnTextarea";
import { getNewTalkIDFromServer } from "./getNewTalkIDFromServer";
import { TalkListDialog } from "./TalkListDialog";
import { ShareURLDialog } from "./ShareURLDialog";
import { get_mode } from "./get_mode";
import { EMPATHY_WRITING_INITIAL_LOGS } from "./PRESET_MESSAGES";
export let getNewTalkIDPromise: Promise<unknown>;
export let sendToServerPromise: Promise<unknown>;

export const NewTalk = () => {
  const [logs, setLogs] = useGlobal("logs");
  const [button_labels] = useGlobal("buttons");
  const [canInput] = useGlobal("canInput");

  useEffect(() => {
    if (get_mode() === "empathy_writing") {
      setLogs(EMPATHY_WRITING_INITIAL_LOGS);
    }
  }, [setLogs]);

  useEffect(() => {
    getNewTalkIDPromise = getNewTalkIDFromServer(gotNewTalkID);
    focusOnTextarea();
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
    sendToServerPromise = sendToServer(text, newLogs);
  };

  const onChange = () => {
    requestAnimationFrame(scrollToBottom);
  };

  const buttons = button_labels.map((label) => {
    const onClick = () => {
      enter(label);
      focusOnTextarea();
    };
    return (
      <Button
        size="small"
        variant="contained"
        onClick={onClick}
        key={"button_" + label}
      >
        {label}
      </Button>
    );
  });
  const InputArea = (props: { visible: Boolean }) => {
    if (props.visible) {
      return (
        <>
          <IconButton onClick={onClickGood}>🙂</IconButton>
          <IconButton onClick={onClickNG}>🙁</IconButton>
          {buttons}
        </>
      );
    }
    return null;
  };
  return (
    <>
      <ButtonAppBarForNewTalk />
      <ChatLine logs={logs}></ChatLine>
      <TextareaAutosize
        aria-label="textarea"
        placeholder=""
        onKeyPress={onKeyPress}
        onChange={onChange}
        id="textarea"
        key="textarea"
        autoFocus
        style={canInput ? {} : { visibility: "hidden" }}
      />

      <InputArea visible={canInput} />
      <hr id="bottom" />
      <TalkListDialog />
      <ShareURLDialog />
    </>
  );
};
