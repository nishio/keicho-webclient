// no previoud id
export const getPreviousTalkID = (): Promise<string> => {
  return Promise.resolve("");
};
export const MOCK_PREVIOUS_ID_EXISTS = (): Promise<string> => {
  return Promise.resolve("test");
};

export const updatePreviousTalkID = (currentTalkID: string): void => {};
