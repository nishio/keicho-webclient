import { setGlobal } from "reactn";
import { get_mode } from "./get_mode";

export const USE_PRESET = false;
export const INITIAL_LOGS = [
  { text: "あなたはこの会話で何がどうなるとよいのでしょう？", user: false },
];

export const EMPATHY_WRITING_INITIAL_LOGS = [
  {
    text: "文章作成を支援するモードです。どんな文章を書こうとしていますか？",
    user: false,
  },
];

export const KPT_INITIAL_LOGS = [
  {
    text: "振り返りを支援するモードです。何について振り返りますか？",
    user: false,
  },
];

const VALUE_HYPOTHESIS_INITIAL_LOGS = [
  {
    text: "作る提案を支援するモードです。どんなものを作ろうと考えていますか？",
    user: false,
  },
];
export const update_initial_message = () => {
  const mode = get_mode();
  if (mode === "empathy_writing") {
    setGlobal({ logs: EMPATHY_WRITING_INITIAL_LOGS });
  } else if (mode === "KPT") {
    setGlobal({ logs: KPT_INITIAL_LOGS });
  } else if (mode === "value_hypothesis") {
    setGlobal({ logs: VALUE_HYPOTHESIS_INITIAL_LOGS });
  }
};
// long logs for debug of CSS
export const PRESET_LOGS = [
  { text: "あなたはこの会話で何が起きて欲しいですか？", user: false },
  {
    text: "聞き出しチャットシステムが現状どうなってるかのデモをしたい",
    user: true,
  },
  {
    text: "そのチャットシステムについて、他に何かありますか？",
    user: false,
  },
  {
    text: "近々 Web UI を作る予定なのだけど、現状の Mattermost 版をデモしたい",
    user: true,
  },
  { text: "その現状について、他に何かありますか？", user: false },
];

export const BOT_IS_SLEEPING = {
  text: "(Botを起こしています。数秒お待ちください...)",
  user: false,
};

export const ERROR_ON_SERVER = {
  text: "問題が発生したため会話を継続できません。",
  user: false,
};

export const BOT_IS_THINKING = {
  text: "(考え中...)",
  user: false,
};

export const LOADING = [
  { text: "過去の会話データを読み込み中です...", user: false },
];
