import React from "react";
import App from "./App";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { initializeGlobalState } from "./initializeGlobalState";
import pretty from "pretty";

import * as getNewTalkID from "./getNewTalkID";
jest.spyOn(getNewTalkID, "getNewTalkID").mockImplementation(() => {
  getNewTalkID._gotNewTalkID("test");
});

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
});
