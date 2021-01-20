import { ReactNode } from "react";
import "./chat_style.scss";
import BotIcon from "./icons8-bot-32.png";
export const ChatLeft = (props: { children: ReactNode }) => {
  return (
    <div className="line__left">
      <figure>
        <img alt="nisbot" src={BotIcon}></img>
      </figure>
      <div className="line__left-text">
        <div className="text">{props.children}</div>
      </div>
    </div>
  );
};

export const ChatRight = (props: { children: ReactNode }) => {
  return (
    <div className="line__right">
      <div className="text">{props.children}</div>
    </div>
  );
};

type TLog = { user: boolean; text: string };
export const ChatLine = (props: { logs: TLog[] }) => {
  const items = props.logs.map((x: TLog, i: number) => {
    if (x.user) {
      return <ChatRight key={i}>{x.text}</ChatRight>;
    } else {
      return <ChatLeft key={i}>{x.text}</ChatLeft>;
    }
  });
  return (
    <div className="line__container">
      <div className="line__contents">{items}</div>
    </div>
  );
};
