# 神戸朝日病院 AIチャットボット

神戸朝日病院のホームページに埋め込み可能なAIチャットボットです。患者様からの症状や質問に対して、適切な診療科や診療時間を案内します。

## 機能

- 症状に基づいた診療科の提案
- 診療時間・担当医師の案内
- 病院へのアクセス情報
- 駐車場・面会時間などの案内
- 専門診療（肝疾患、透析、内視鏡検査など）の説明
- 24時間対応可能なレスポンシブデザイン

## 必要な環境

- Node.js (v16以上)
- Claude API キー（Anthropicから取得）

## セットアップ手順

### 1. 依存パッケージのインストール

```bash
cd chatbot-server
npm install
```

### 2. Claude APIキーの設定

環境変数にAnthropicのAPIキーを設定します。

**Macの場合：**
```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

**Windowsの場合（コマンドプロンプト）：**
```cmd
set ANTHROPIC_API_KEY=your-api-key-here
```

**Windowsの場合（PowerShell）：**
```powershell
$env:ANTHROPIC_API_KEY="your-api-key-here"
```

または、`.env`ファイルを作成して設定することもできます：

```
ANTHROPIC_API_KEY=your-api-key-here
PORT=3000
```

### 3. サーバーの起動

```bash
npm start
```

サーバーが起動したら、ブラウザで以下にアクセスしてテストできます：
```
http://localhost:3000
```

## ホームページへの埋め込み方法

### 方法1: iframeで埋め込む（簡単）

ホームページのHTMLに以下のコードを追加：

```html
<iframe 
    src="https://your-server.com" 
    style="position: fixed; bottom: 0; right: 0; width: 400px; height: 600px; border: none; z-index: 9999;"
></iframe>
```

### 方法2: ウィジェットコードを直接埋め込む（推奨）

`public/widget.html`の内容をコピーして、ホームページの`</body>`タグの直前に貼り付けます。

**重要：** `widget.html`内の以下の行を実際のサーバーURLに変更してください：

```javascript
const CHATBOT_API = 'https://your-server.com/api/chat'; // ← ここを変更
```

## 本番環境へのデプロイ

### Herokuへのデプロイ例

1. Herokuアカウントを作成
2. Heroku CLIをインストール
3. 以下のコマンドを実行：

```bash
heroku create your-hospital-chatbot
heroku config:set ANTHROPIC_API_KEY=your-api-key-here
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### その他のホスティングサービス

- **AWS EC2 / Lightsail**: Node.jsアプリケーションとして直接デプロイ
- **Google Cloud Run**: Dockerコンテナとしてデプロイ
- **Vercel / Netlify**: サーバーレス関数として実装

## カスタマイズ

### デザインの変更

`public/index.html`や`public/widget.html`のCSSセクションを編集することで、色やレイアウトをカスタマイズできます。

### システムプロンプトの調整

`server.js`の`systemPrompt`変数を編集することで、AIの応答スタイルや情報の優先順位を変更できます。

### 病院情報の更新

`hospital_info.txt`ファイルを更新してサーバーを再起動すると、最新の情報が反映されます。

## セキュリティに関する注意事項

1. **APIキーの管理**: 環境変数を使用し、コード内に直接APIキーを書かないでください
2. **CORS設定**: 本番環境では、特定のドメインのみを許可するように`server.js`のCORS設定を変更してください
3. **レート制限**: 必要に応じてリクエスト制限を実装してください
4. **HTTPS**: 本番環境では必ずHTTPSを使用してください

## トラブルシューティング

### サーバーが起動しない

- Node.jsがインストールされているか確認
- `npm install`を実行済みか確認
- ポート3000が他のアプリケーションで使用されていないか確認

### APIキーのエラー

- 環境変数`ANTHROPIC_API_KEY`が正しく設定されているか確認
- APIキーが有効か、Anthropicのダッシュボードで確認

### チャットボットが応答しない

- ブラウザのコンソールでエラーメッセージを確認
- サーバーが起動しているか確認
- `widget.html`内のAPIエンドポイントURLが正しいか確認

## API使用料金について

このチャットボットはClaude APIを使用します。使用量に応じて料金が発生します。
詳細はAnthropicの料金ページをご確認ください：
https://www.anthropic.com/pricing

推奨：
- 開発・テスト時は使用量を監視
- 本番環境ではレート制限を実装
- 月次の使用量上限を設定

## サポート

問題が発生した場合は、以下を確認してください：
- サーバーログ（コンソール出力）
- ブラウザの開発者ツール（コンソールタブ）
- ネットワークタブでAPIリクエストの状態

## ライセンス

MIT License

## 連絡先

開発者: [あなたの名前]
メール: [メールアドレス]
