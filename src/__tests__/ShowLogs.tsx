import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { initializeGlobalState } from "../initializeGlobalState";

import { act, fireEvent, render, screen } from "@testing-library/react";
import * as loadLogsFromFirestoreModule from "../loadLogsFromFirestore";
import * as MockTalkObject from "../talkObject.json";
import { loadLogsPromise, ShowLog } from "../ShowLog";
import * as RegroupDialogModule from "../RegroupDialog";
import { mockUseState } from "../testutil/mockUseState";

jest.spyOn(window, "scrollTo").mockImplementation(() => {});

let container: HTMLDivElement;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    initializeGlobalState();
  });
  mockUseState();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
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
