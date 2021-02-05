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

function App() {
  const hash = new URLSearchParams(window.location.hash.substring(1));
  if (hash.has("talk")) {
    const talk = hash.get("talk") as string;
    return <ShowLog talk={talk} />;
  } else {
    return <NewTalk />;
  }
}

export default App;
