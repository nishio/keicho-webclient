import { getGlobal } from "reactn";

export const showLogInNewWindow = () => {
  const TalkID = getGlobal().TalkID;
  window.open(`#talk=${TalkID}`, "_blank");
};
