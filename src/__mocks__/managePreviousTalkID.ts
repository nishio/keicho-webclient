export const args = { previousTalkID: "test" };

export const getPreviousTalkID = (): Promise<string> => {
  return Promise.resolve(args.previousTalkID);
};

export const updatePreviousTalkID = (currentTalkID: string): void => {};
