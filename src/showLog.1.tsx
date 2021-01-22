import { TalkID } from "./NewTalk";

export const showLog = () => {
  window.open(`#talk=${TalkID}`, "_blank");
};
