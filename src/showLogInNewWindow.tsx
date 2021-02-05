import { TalkID } from "./NewTalk";

export const showLogInNewWindow = () => {
  window.open(`#talk=${TalkID}`, "_blank");
};
