import React, { useEffect } from "react";
import "./App.css";
import db from "./FirestoreIO";
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
  useEffect(() => {
    const key = "I9IlVW6Xt58NlNHAjdfq";
    console.log("reading", key);
    db.collection("yagokoro_env")
      .doc(key)
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          const data = doc.data();
          console.log(data);
          const x = JSON.parse(data.json);
          console.log(x);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
  }, []);
  return <br />;
};

function App() {
  const hash = new URLSearchParams(window.location.hash.substring(1));
  if (hash.has("talk")) {
    return <ShowLog />;
  } else {
    return <NewTalk />;
  }
}

export default App;
