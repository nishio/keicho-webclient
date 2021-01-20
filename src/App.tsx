import React, { KeyboardEventHandler, useState } from "react";
import "./App.css";
import Menu from "./Menu";
import { TextareaAutosize } from "@material-ui/core";
import { ChatLine } from "./ChatContents";
import { textChangeRangeIsUnchanged } from "typescript";

function App() {
  const [logs, setLogs] = useState([
    { text: "あなたはこの会話で何が起きて欲しいですか？", user: false },
    {
      text: "聞き出しチャットシステムが現状どうなってるかのデモをしたい",
      user: true,
    },
    {
      text: "そのチャットシステムについて、他に何かありますか？",
      user: false,
    },
    {
      text:
        "近々 Web UI を作る予定なのだけど、現状の Mattermost 版をデモしたい",
      user: true,
    },
    { text: "その現状について、他に何かありますか？", user: false },
  ]);

  const onKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLTextAreaElement;
      const text = target.value;
      target.value = "";
      e.preventDefault();
      if (text !== "") {
        setLogs([...logs, { text: text, user: true }]);
      }
    }
  };

  return (
    <div className="App">
      <Menu />
      <ChatLine logs={logs}></ChatLine>

      <TextareaAutosize
        aria-label="empty textarea"
        placeholder=""
        onKeyPress={onKeyPress}
      />
    </div>
  );
}

export default App;
