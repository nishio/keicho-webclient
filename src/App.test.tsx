import React, { Dispatch } from "react";
import { unmountComponentAtNode } from "react-dom";
import { initializeGlobalState } from "./initializeGlobalState";

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import * as loadLogsFromFirestoreModule from "./loadLogsFromFirestore";
import * as MockTalkObject from "./talkObject.json";
import { loadLogsPromise, ShowLog } from "./ShowLog";
import * as RegroupDialogModule from "./RegroupDialog";
import App from "./App";
import * as managePreviousTalkIDModule from "./managePreviousTalkID";
import { useState as originalUseState } from "react";
import { getNewTalkIDPromise } from "./NewTalk";

jest.mock("./managePreviousTalkID");
jest.mock("./getNewTalkIDFromServer");

jest.spyOn(window, "scrollTo").mockImplementation(() => {});

let container: HTMLDivElement;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    initializeGlobalState();
  });
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
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

test("render", async () => {
  // render when previousTalkID does not exist
  jest
    .spyOn(managePreviousTalkIDModule, "getPreviousTalkID")
    .mockResolvedValue("");

  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
  fireEvent.click(screen.getByLabelText("menu"));
  await getNewTalkIDPromise;
  expect(screen.queryByText("Re-enter to Last Talk")).toBeNull();

  // render when previousTalkID exists
  jest
    .spyOn(managePreviousTalkIDModule, "getPreviousTalkID")
    .mockResolvedValue("test");
  render(<App />);
  await getNewTalkIDPromise;
  expect(screen.queryByText("Re-enter to Last Talk")).not.toBeNull();
});

test("show log", async () => {
  const m = jest
    .spyOn(loadLogsFromFirestoreModule, "loadLogsFromFirestore")
    .mockResolvedValue(MockTalkObject);

  // no talkID needed beacuse loadLogsFromFirestore is mocked
  render(<ShowLog talk="" />);
  await loadLogsPromise;
  expect(m).toHaveBeenCalled();
  expect(screen.getByText("🙁")).toBeTruthy();
  const m2 = jest.spyOn(RegroupDialogModule, "openRegroupDialog");
  fireEvent.click(screen.getByLabelText("menu"));
  fireEvent.click(screen.getByText("Export for Regroup"));
  expect(m2).toHaveBeenCalled();
  expect(m2.mock.calls[0][0]).toMatchSnapshot();
  m.mockRestore();
  m2.mockRestore();
});
