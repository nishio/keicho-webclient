import React from "react";
import "./App.css";
import Menu from "./Menu";
import { TextareaAutosize } from "@material-ui/core";
import { ChatLine } from "./ChatContents";

function App() {
  return (
    <div className="App">
      <Menu />
      <ChatLine
        logs={[
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
        ]}
      ></ChatLine>

      <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />
    </div>
  );
}

export default App;
