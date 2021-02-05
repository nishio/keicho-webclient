import React, { useEffect } from "react";
import { useGlobal } from "reactn";
import { ChatLine } from "./ChatContents";
import { loadLogs } from "./loadLogs";
import { ButtonAppBarForShowLog } from "./Menu";
import { RegroupDialog } from "./RegroupDialog";
import { ScrapboxDialog } from "./ScrapboxDialog";

export const ShowLog = (props: { talk: string }) => {
  const [logs] = useGlobal("logs");

  useEffect(() => {
    loadLogs(props.talk);
  }, [props.talk]);
  return (
    <div className="App">
      <ButtonAppBarForShowLog />
      <ChatLine logs={logs}></ChatLine>
      <RegroupDialog />
      <ScrapboxDialog />
    </div>
  );
};
