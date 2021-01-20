import React, { KeyboardEventHandler, useState } from "react";
import "./App.css";
import Menu from "./Menu";
import { TextareaAutosize } from "@material-ui/core";
import { ChatLine } from "./ChatContents";

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
        const newLogs = [...logs, { text: text, user: true }];
        setLogs(newLogs);
        // send to server
        const data = { user: "test", talk: "test", text: text };
        const API = "https://keicho.herokuapp.com/api/web/";
        fetch(API, {
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
          });
        });
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
