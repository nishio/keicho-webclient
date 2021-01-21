import React from "react";
import "./App.css";
import { NewTalk } from "./NewTalk";

const USE_LOCAL_SERVER = false;
const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const APIROOT =
  IS_PRODUCTION || !USE_LOCAL_SERVER
    ? "https://keicho.herokuapp.com/api/"
    : "http://localhost:5000/api/";

export const USE_PRESET = false;
export const INITIAL_LOGS = [
  { text: "あなたはこの会話で何が起きて欲しいですか？", user: false },
];

const ShowLog = () => {
  return <br />;
};

function App() {
  const hash = new URLSearchParams(window.location.hash);
  if (hash.has("talk")) {
    return <ShowLog />;
  } else {
    return <NewTalk />;
  }
}

export default App;
