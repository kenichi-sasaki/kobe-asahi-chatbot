# 神戸朝日病院 AIチャットボット - クイックスタートガイド

## 🚀 5分でできる!セットアップ手順

### ステップ1: ファイルの準備
ダウンロードしたフォルダ(`chatbot-server`)をデスクトップなど任意の場所に配置してください。

### ステップ2: Node.jsのインストール
Node.jsがインストールされていない場合は、以下からダウンロードしてインストールしてください：
https://nodejs.org/ (LTS版を推奨)

### ステップ3: Claude APIキーの取得
1. https://console.anthropic.com/ にアクセス
2. アカウントを作成（まだの場合）
3. "API Keys"からAPIキーを生成
4. 生成されたAPIキーをコピー（後で使用）

### ステップ4: 依存パッケージのインストール
ターミナル（コマンドプロンプト）を開いて、以下を実行：

```bash
cd chatbot-server
npm install
```

### ステップ5: APIキーの設定

**Mac/Linuxの場合：**
```bash
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxx"
```

**Windowsの場合：**
```cmd
set ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

または、`.env.example`を`.env`にリネームして編集：
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
PORT=3000
```

### ステップ6: サーバーの起動
```bash
npm start
```

成功すると以下のメッセージが表示されます：
```
チャットボットサーバーが起動しました: http://localhost:3000
```

### ステップ7: テスト
ブラウザで以下にアクセスして動作確認：
```
http://localhost:3000
```

右下にチャットボタンが表示されたら成功です！

---

## 📝 ホームページへの埋め込み

### 方法A: ウィジェットコードをコピペ（推奨）

1. `public/widget.html`を開く
2. 全ての内容をコピー
3. あなたのホームページの`</body>`タグの直前に貼り付け
4. 以下の行を編集：
   ```javascript
   const CHATBOT_API = 'https://your-server.com/api/chat';
   ```
   ↓
   ```javascript
   const CHATBOT_API = 'https://実際のサーバーURL/api/chat';
   ```

### 方法B: iframeで埋め込む

ホームページに以下を追加：
```html
<iframe 
    src="https://実際のサーバーURL" 
    style="position: fixed; bottom: 0; right: 0; width: 400px; height: 600px; border: none; z-index: 9999;"
></iframe>
```

---

## 🌐 本番環境へのデプロイ

### おすすめのホスティングサービス

1. **Heroku（初心者向け）**
   - 無料枠あり
   - 簡単デプロイ
   - https://heroku.com

2. **Railway（モダン）**
   - シンプルなUI
   - GitHubと連携
   - https://railway.app

3. **Render（おすすめ）**
   - 無料枠あり
   - 自動デプロイ
   - https://render.com

### Renderでのデプロイ例

1. GitHubにコードをプッシュ
2. Render.comでアカウント作成
3. "New Web Service"をクリック
4. GitHubリポジトリを選択
5. 環境変数に`ANTHROPIC_API_KEY`を設定
6. "Create Web Service"をクリック

数分でデプロイ完了！

---

## 💡 よくある質問

### Q: チャットボットが応答しません
A: 
1. サーバーが起動しているか確認
2. ブラウザのコンソールでエラーを確認
3. APIキーが正しく設定されているか確認

### Q: CORS エラーが出ます
A: `server.js`のCORS設定を確認してください。開発環境では全て許可されていますが、本番環境では特定のドメインのみを許可するように変更してください。

### Q: API使用料金はいくらですか？
A: Claude Sonnet 4の料金は以下の通りです（2025年1月時点）：
- 入力: $3.00 / 1M tokens
- 出力: $15.00 / 1M tokens

通常の質問応答であれば、1回のやり取りで数円程度です。

### Q: カスタマイズできますか？
A: はい！
- デザイン: `public/index.html`や`widget.html`のCSSを編集
- 応答内容: `server.js`の`systemPrompt`を編集
- 病院情報: `hospital_info.txt`を更新

---

## 🆘 サポート

問題が発生した場合：
1. README.mdの詳細なドキュメントを確認
2. サーバーログを確認
3. ブラウザの開発者ツールでエラーを確認

---

## 📊 動作確認用のテスト質問

チャットボットが正しく動作しているか、以下の質問で確認できます：

- "お腹が痛いのですが、何科を受診すればいいですか？"
- "月曜日の午前中に診察してもらえる消化器の先生は誰ですか？"
- "病院へのアクセス方法を教えてください"
- "駐車場はありますか？"
- "内視鏡検査について教えてください"

---

完璧！あなたの病院用チャットボットが完成しました 🎉
