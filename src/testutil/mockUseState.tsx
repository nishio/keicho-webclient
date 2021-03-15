import React, { Dispatch, useCallback } from "react";
import { act } from "@testing-library/react";
import { useState as originalUseState } from "react";

export const mockUseState = () => {
  return jest.spyOn(React, "useState").mockImplementation((arg?: unknown): [
    unknown,
    Dispatch<unknown>
  ] => {
    const [s, dispatch] = originalUseState(arg);
    const wrappedDispatch = useCallback(
      (arg: unknown): void => {
        act(() => {
          dispatch(arg);
        });
      },
      [dispatch]
    );
    return [s, wrappedDispatch];
  });
};
