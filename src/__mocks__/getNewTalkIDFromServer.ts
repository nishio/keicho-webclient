export const getNewTalkIDFromServer = (
  gotNewTalkID: (TalkID: string) => Promise<string>
): Promise<void> => {
  return gotNewTalkID("test").then();
};
