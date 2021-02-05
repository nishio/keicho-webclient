import { setGlobal } from "reactn";
import { INITIAL_LOGS, PRESET_LOGS, USE_PRESET } from "./PRESET_MESSAGES";

const INITIAL_GLOBAL_STATE = {
  TalkID: "",
  logs: USE_PRESET ? PRESET_LOGS : INITIAL_LOGS,
  lastKeywords: [] as string[],
  otherKeywords: [] as string[],
  canInput: true,
  previousTalkID: "",
};

export const initializeGlobalState = () => {
  setGlobal(INITIAL_GLOBAL_STATE);
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}
