import React from "react";
import "./App.css";
import Menu from "./Menu";
import { Avatar, TextareaAutosize } from "@material-ui/core";
import "./chat_style.scss";

function App() {
  return (
    <div className="App">
      <Menu />
      <div className="line__container">
        <div className="line__contents">
          <div className="line__left">
            <figure>
              <img
                alt="nisbot"
                src="https://i.gyazo.com/a2f9513decfd964746c44b41dd88282a.png"
              ></img>
            </figure>
            <div className="line__left-text">
              <div className="name">nisbot</div>
              <div className="text">
                あなたはこの会話で何が起きて欲しいですか？
              </div>
            </div>
          </div>
          <div className="line__right">
            <div className="text">
              聞き出しチャットシステムが現状どうなってるかのデモをしたい
            </div>
          </div>
        </div>
      </div>

      <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />
    </div>
  );
}

export default App;
