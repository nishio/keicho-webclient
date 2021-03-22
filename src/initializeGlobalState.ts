import { setGlobal } from "reactn";
import { INITIAL_LOGS, PRESET_LOGS, USE_PRESET } from "./PRESET_MESSAGES";

type TTalkObject =
  | undefined
  | {
      line_id_to_selected_keywords: [number, string[]][];
      log: [number, string][];
    };

const INITIAL_GLOBAL_STATE = {
  TalkID: "",
  logs: USE_PRESET ? PRESET_LOGS : INITIAL_LOGS,
  lastKeywords: [] as string[],
  otherKeywords: [] as string[],
  canInput: true,
  previousTalkID: "",
  talkObject: undefined as TTalkObject,
  dialog: null as "ShareURL" | "Scrapbox" | "Regroup" | "TalkList" | null,
};

export const initializeGlobalState = () => {
  setGlobal(INITIAL_GLOBAL_STATE);
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}
