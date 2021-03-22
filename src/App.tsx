import React from "react";
import "./App.css";
import { NewTalk } from "./NewTalk";
import { ShowLog } from "./ShowLog";
import { USE_LOCAL_SERVER } from "./USE_LOCAL_SERVER";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const APIROOT =
  IS_PRODUCTION || !USE_LOCAL_SERVER
    ? "https://keicho.herokuapp.com/api/"
    : "http://localhost:5000/api/";

const getTalkID = (): string => {
  const hash = new URLSearchParams(window.location.hash.substring(1));
  if (hash.has("talk")) {
    return hash.get("talk") as string;
  }
  return "";
};

function App() {
  const TalkID = getTalkID();
  const main = TalkID !== "" ? <ShowLog talk={TalkID} /> : <NewTalk />;
  return <div className="App">{main}</div>;
}

export default App;
