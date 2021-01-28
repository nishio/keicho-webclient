import { ReactNode } from "react";
import "./chat_style.scss";
import BotIcon from "./icons8-bot-32.png";

const pretty = (text: string) => {
  const ret: ReactNode[] = [];
  text = text.trim();
  text.split("\n\n").forEach((x, i) => {
    if (i > 0) {
      ret.push(<hr key={i} />);
    }
    x.split("\n").forEach((x, j) => {
      if (j > 0) {
        ret.push(<br key={`${i}-${j}`} />);
      }
      ret.push(x.trim());
    });
  });
  return ret;
};
export const ChatLeft = (props: { children: ReactNode }) => {
  return (
    <div className="line__left">
      <figure>
        <img alt="nisbot" src={BotIcon}></img>
      </figure>
      <div className="line__left-text">
        <div className="text">{pretty(props.children as string)}</div>
      </div>
    </div>
  );
};

export const ChatRight = (props: { children: ReactNode }) => {
  const text = props.children as string;
  if (text.match(/[(（]/)) {
    return (
      <div className="line__right">
        <div className="text comment">{pretty(text)}</div>
      </div>
    );
  } else {
    return (
      <div className="line__right">
        <div className="text">{pretty(text)}</div>
      </div>
    );
  }
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
