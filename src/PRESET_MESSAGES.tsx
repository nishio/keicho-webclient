export const USE_PRESET = false;
export const INITIAL_LOGS = [
  { text: "あなたはこの会話で何が起きて欲しいですか？", user: false },
];

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
