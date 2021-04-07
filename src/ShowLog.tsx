import React, { useEffect } from "react";
import { useGlobal } from "reactn";
import { ChatLine } from "./ChatContents";
import { loadLogs } from "./loadLogs";
import { ButtonAppBarForShowLog } from "./Menu";
import { RegroupDialog } from "./RegroupDialog";
import { ScrapboxDialog } from "./ScrapboxDialog";
import { TalkListDialog } from "./TalkListDialog";
export let loadLogsPromise: Promise<unknown>;
export const ShowLog = (props: { talk: string }) => {
  const [logs] = useGlobal("logs");

  useEffect(() => {
    loadLogsPromise = loadLogs(props.talk);
  }, [props.talk]);
  return (
    <>
      <ButtonAppBarForShowLog />
      <ChatLine logs={logs}></ChatLine>
      <TalkListDialog />
      <RegroupDialog />
      <ScrapboxDialog />
    </>
  );
};
