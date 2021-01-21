import React, { KeyboardEventHandler, useEffect, useState } from "react";
import Menu from "./Menu";
import { TextareaAutosize } from "@material-ui/core";
import { ChatLine } from "./ChatContents";
import { PRESET_LOGS } from "./PRESET_LOGS";
import { USE_PRESET, INITIAL_LOGS, APIROOT, TalkID } from "./App";

export const NewTalk = () => {
  const [logs, setLogs] = useState(USE_PRESET ? PRESET_LOGS : INITIAL_LOGS);

  useEffect(() => {
    fetch(APIROOT + "web/create", {
      mode: "cors",
      method: "GET",
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        TalkID = text;
      });
  }, []);

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
        const data = { user: "nobody", talk: TalkID, text: text };
        fetch(APIROOT + "web/", {
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
};
