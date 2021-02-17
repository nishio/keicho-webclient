import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { initializeGlobalState } from "./initializeGlobalState";

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import * as loadLogsModule from "./loadLogsFromFirestore";
import * as MockTalkObject from "./talkObject.json";
import { ShowLog } from "./ShowLog";
import * as RegroupDialogModule from "./RegroupDialog";
import App from "./App";
import pretty from "pretty";
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
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

test("render", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
  // expect(pretty(container.innerHTML)).toMatchSnapshot();
  // jest.spyOn(sendToServer, "sendToServer").mockImplementation(() => {
  //   sendToServer._gotResponse([{ user: true, text: "aaa" }], {
  //     text: "bbb",
  //     last_kw: ["a"],
  //     other_kw: ["b"],
  //   });
  // });
  // const textarea = container.querySelector("[id=textarea]");
  // expect(textarea).not.toBeNull();
  // act(() => {
  //   textarea?.dispatchEvent(
  //     new KeyboardEvent("keypress", {
  //       key: "Enter",
  //       bubbles: true,
  //     })
  //   );
  //   const e = textarea as HTMLTextAreaElement;
  //   e.value = "hello";
  //   // ReactTestUtils.Simulate.keyPress(e, {
  //   //   key: "Space",
  //   // });
  //   ReactTestUtils.Simulate.keyPress(e, {
  //     key: "Enter",
  //   });
  // });
  // expect(pretty(container.innerHTML)).toMatchSnapshot("reply");
});

test("show log", async () => {
  const m = jest
    .spyOn(loadLogsModule, "loadLogsFromFirestore")
    .mockResolvedValue(MockTalkObject);

  // no talkID needed beacuse loadLogsFromFirestore is mocked
  render(<ShowLog talk="" />);
  await waitFor(() => screen.getByText("🙁"));

  const m2 = jest.spyOn(RegroupDialogModule, "openRegroupDialog");
  fireEvent.click(screen.getByLabelText("menu"));
  fireEvent.click(screen.getByText("Export for Regroup"));
  expect(m2).toHaveBeenCalled();
  expect(m2.mock.calls[0][0]).toMatchSnapshot();

  m.mockRestore();
  m2.mockRestore();
});

// expect(
//   screen.getByTestId("textarea-export-for-regroup").nodeValue
// ).toMatchSnapshot();

// const m = jest.spyOn(reactn, "setGlobal");
// // render(<ShowLog talk="SJSLzd0PCLcJ3Nzlfdc4" />);
// await loadLogs("SJSLzd0PCLcJ3Nzlfdc4");
// expect(m.mock.calls).toMatchSnapshot();
// const m = jest.spyOn(RegroupDialog, "openRegroupDialog");
// // expect(pretty(container.innerHTML)).toMatchSnapshot();
// fireEvent.click(await screen.findByLabelText("menu"));
// fireEvent.click(await screen.findByText("Export for Regroup"));
// await expect(m).toHaveBeenCalled();
// m.mockRestore();
// act(() => {
//   ReactTestUtils.Simulate.click(container.querySelector("[id=menu]")!);
// });
// act(() => {
//   ReactTestUtils.Simulate.click(
//     container.querySelector("[id=exportForScrapbox]")!
//   );
// });
// expect(pretty(container.innerHTML)).toMatchSnapshot();
