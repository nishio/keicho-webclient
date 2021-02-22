import { unmountComponentAtNode } from "react-dom";
import { initializeGlobalState } from "../initializeGlobalState";
import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import * as managePreviousTalkIDModule from "../managePreviousTalkID";
import { getNewTalkIDPromise } from "../NewTalk";
import { mockUseState } from "./mockUseState";

jest.mock("../managePreviousTalkID");
jest.mock("../getNewTalkIDFromServer");

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
