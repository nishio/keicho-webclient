import React from "react";
import App from "./App";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { initializeGlobalState } from "./initializeGlobalState";
import pretty from "pretty";
import ReactTestUtils from "react-dom/test-utils";

import * as getNewTalkID from "./getNewTalkID";
import * as sendToServer from "./sendToServer";
jest.spyOn(getNewTalkID, "getNewTalkID").mockImplementation(() => {
  getNewTalkID._gotNewTalkID("test");
});

jest.spyOn(window, "scrollTo").mockImplementation(() => {});

let container: HTMLDivElement;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  initializeGlobalState();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

test("render", () => {
  act(() => {
    render(<App />, container);
  });
  expect(pretty(container.innerHTML)).toMatchSnapshot();

  jest.spyOn(sendToServer, "sendToServer").mockImplementation(() => {
    sendToServer._gotResponse([{ user: true, text: "aaa" }], {
      text: "bbb",
      last_kw: ["a"],
      other_kw: ["b"],
    });
  });

  const textarea = container.querySelector("[id=textarea]");
  expect(textarea).not.toBeNull();

  act(() => {
    textarea?.dispatchEvent(
      new KeyboardEvent("keypress", {
        key: "Enter",
        bubbles: true,
      })
    );
    const e = textarea as HTMLTextAreaElement;
    e.value = "hello";
    // ReactTestUtils.Simulate.keyPress(e, {
    //   key: "Space",
    // });
    ReactTestUtils.Simulate.keyPress(e, {
      key: "Enter",
    });
  });
  expect(pretty(container.innerHTML)).toMatchSnapshot("reply");
});
