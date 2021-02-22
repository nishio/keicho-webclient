import { unmountComponentAtNode } from "react-dom";
import { initializeGlobalState } from "../initializeGlobalState";
import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import * as managePreviousTalkIDModule from "../managePreviousTalkID";
import { getNewTalkIDPromise, sendToServerPromise } from "../NewTalk";
import { mockUseState } from "./mockUseState";
import * as sendToServerModule from "../sendToServer";
import userEvent from "@testing-library/user-event";
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

test("enter", async () => {
  jest
    .spyOn(managePreviousTalkIDModule, "getPreviousTalkID")
    .mockResolvedValue("");
  jest
    .spyOn(sendToServerModule, "sendToServer")
    .mockImplementation(async () => {
      sendToServerModule._gotResponse([{ user: true, text: "aaa" }], {
        text: "bbb",
        last_kw: ["a"],
        other_kw: ["b"],
      });
    });

  const { container } = render(<App />);
  const textarea = container.querySelector("[id=textarea]");
  expect(textarea!).not.toBeNull();

  act(() => {
    userEvent.type(textarea!, "Hello, World!{enter}");
  });
  expect(textarea!).toHaveValue("");
  await sendToServerPromise;
  expect(container).toMatchSnapshot();
});
