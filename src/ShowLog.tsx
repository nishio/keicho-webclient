import React, { useEffect, useState } from "react";
import { ChatLine } from "./ChatContents";
import db from "./FirestoreIO";
import Menu from "./Menu";
const LOADING = [{ text: "過去の会話データを読み込み中です...", user: false }];

export const ShowLog = () => {
  const [logs, setLogs] = useState(LOADING);

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

          setLogs(
            x.log.map((x: any) => {
              return {
                user: x[0] === 1 ? true : false,
                text: x[1],
              };
            })
          );
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
  }, []);
  return (
    <div className="App">
      <Menu />
      <ChatLine logs={logs}></ChatLine>
    </div>
  );
};
