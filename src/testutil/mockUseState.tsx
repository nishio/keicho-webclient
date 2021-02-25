import React, { Dispatch } from "react";
import { act } from "@testing-library/react";
import { useState as originalUseState } from "react";

export const mockUseState = () => {
  jest.spyOn(React, "useState").mockImplementation((arg?: unknown): [
    unknown,
    Dispatch<unknown>
  ] => {
    const [s, setS] = originalUseState(arg);
    return [
      s,
      (arg: unknown) => {
        act(() => {
          setS(arg);
        });
      },
    ];
  });
};
