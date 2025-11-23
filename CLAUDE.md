# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Keichoは「聞き出しチャットシステム」のWebクライアントです。ユーザーとの対話を通じて思考を引き出すチャットボットアプリケーションです。

- フロントエンド: React + TypeScript + Material-UI
- バックエンドAPI: Heroku (https://keicho.herokuapp.com/api/)
- デプロイ: Netlify
- データ管理: Firebase Firestore (リモート) + Dexie (ローカルIndexedDB)
- 状態管理: ReactN (React用のグローバル状態管理)
- エラートラッキング: Sentry

## 開発コマンド

```bash
# 開発サーバーを起動（ポート3000で起動）
npm start

# プロダクションビルド
npm run build

# テストを実行
npm test
```

## アーキテクチャの要点

### エントリーポイントとルーティング
- `src/index.tsx`: アプリケーションのエントリーポイント。グローバル状態の初期化とSentryの初期化を行う
- `src/App.tsx`: ルートコンポーネント。URL hashの`talk`パラメータで2つのモードを切り替え:
  - hash無し → `NewTalk`: 新規会話モード
  - hash有り (`#talk=xxx`) → `ShowLog`: 過去の会話を表示するモード

### グローバル状態管理
- `src/initializeGlobalState.ts`: ReactNを使用したグローバル状態の定義
- 主要な状態:
  - `TalkID`: 現在の会話ID
  - `logs`: メッセージの履歴（`{text: string, user: boolean}[]`形式）
  - `buttons`: ボットから提示される選択肢ボタン
  - `canInput`: ユーザー入力の可否
  - `dialog`: 開いているダイアログの種類（ShareURL/Scrapbox/Regroup/TalkList）
  - `config`: ユーザー設定

### データ永続化
二重のストレージ戦略を採用:

1. **ローカルストレージ** (`src/localDB.ts`):
   - Dexie（IndexedDB wrapper）を使用
   - `talks`テーブル: TalkID、最終更新時刻、最初の行を保存
   - `config`テーブル: ユーザー設定を保存
   - `window.localDB`でデバッグ用にグローバル公開

2. **リモートストレージ** (`src/FirestoreIO.ts`):
   - Firebase Firestoreに会話データを保存
   - プロジェクトID: `regroup-d4932`

### サーバー通信
- `src/sendToServer.ts`: バックエンドAPIとの通信を担当
  - エンドポイント: `${APIROOT}web/`（POST）
  - リクエスト形式: `{user: "nobody", talk: TalkID, text: ユーザー入力}`
  - レスポンス処理: ボットの返答、ボタン、入力可否状態を受け取る
  - TalkIDが未設定時はボットをスリープ状態にし、ID取得後に再送
  - エラー時はSentryにレポート

### API切り替え
- `src/USE_LOCAL_SERVER.tsx`: 開発時にローカルサーバーを使うかを制御
- `src/App.tsx`の`APIROOT`: production環境またはローカルサーバー無効時はHerokuを使用

### 主要コンポーネント
- `NewTalk.tsx`: 新規会話画面（チャット入力とメッセージ表示）
- `ShowLog.tsx`: 過去の会話を表示
- `TalkListDialog.tsx`: 過去の会話一覧を表示するダイアログ
- `ShareURLDialog.tsx`: 会話のURLを共有するダイアログ
- `ScrapboxDialog.tsx`: Scrapboxへエクスポートする機能
- `RegroupDialog.tsx`: メッセージを再グループ化する機能

### テスト
- テストファイルは`src/tests/`に配置
- Jestとreact-testing-libraryを使用
- モックは`src/__mocks__/`に配置
