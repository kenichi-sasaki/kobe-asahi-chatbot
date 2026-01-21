require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 病院情報を読み込み
const hospitalInfo = fs.readFileSync(
  path.join(__dirname, 'hospital_info.txt'),
  'utf-8'
);

// システムプロンプト
const systemPrompt = `あなたは神戸朝日病院の案内AIアシスタントです。以下の情報に基づいて、患者様からの質問に丁寧に回答してください。

# 重要な指示
1. 症状について質問された場合は、適切な診療科を提案し、その診療科の診療時間と担当医師を具体的に案内してください
2. 診療時間は午前（8:10-12:00受付、9:00-診察）、午後（13:30-16:00受付、14:30-診察）、夜間（17:00-18:30受付、17:30-診察）に分かれています
3. 休診日は日曜・祝日・年末年始（12/30-1/3）です
4. 救急の場合は24時間対応可能であることを伝えてください
5. 回答は簡潔で分かりやすく、必要な情報を漏らさないようにしてください
6. 医療的な診断や治療方法の具体的なアドバイスは避け、受診を勧めてください

# 重要な連絡先情報
- 病院代表電話番号: 078-612-5151
- 地域医療連携室（直通）: 078-612-5420
- FAX（直通）: 078-612-5157

電話でのお問い合わせを案内する場合は、必ず正しい電話番号「078-612-5151（代表）」を伝えてください。

# 病院情報
${hospitalInfo}

# 症状と診療科の対応例
- 腹痛、胃痛、吐き気 → 消化器内科（金守良、金秀基、藤井、阪本、早雲医師）
- 胸痛、動悸、息切れ → 循環器内科（佐々木医師）
- 頭痛、めまい、しびれ → 脳神経内科（緒方医師）
- 腰痛、関節痛、骨折 → 整形外科（高藤、肱黒医師）
- 血尿、頻尿、尿路結石 → 泌尿器科（浜口医師）
- 腎臓病、透析 → 腎臓内科（高見医師）
- 咳、息苦しさ → 呼吸器内科（中嶋医師）
- 肝臓病、肝炎 → 肝臓内科（金守良、金秀基医師）
- 外科的処置、手術 → 外科（奥田医師）
- 皮膚の症状 → 皮膚科（神戸大学医師・木曜午後）
- 糖尿病 → 糖尿病内科（神戸大学医師・水曜午後）
- ストレス、不眠 → 心療内科（岡田医師・火曜夜間）`;

// チャットエンドポイント
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'メッセージが必要です' });
    }

    // Claude APIキーの確認
   const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'APIキーが設定されていません。環境変数ANTHROPIC_API_KEYを設定してください。' 
      });
    }

    // 会話履歴を構築
    const messages = [
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Claude APIを呼び出し
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API Error:', errorData);
      return res.status(response.status).json({ 
        error: 'Claude APIからエラーが返されました',
        details: errorData 
      });
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    res.json({ 
      message: assistantMessage,
      conversationHistory: [
        ...messages,
        { role: 'assistant', content: assistantMessage }
      ]
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      error: 'サーバーエラーが発生しました',
      details: error.message 
    });
  }
});

// デフォルトルート
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '神戸朝日病院チャットボットサーバーは正常に稼働中です' });
});

app.listen(PORT, () => {
  console.log(`チャットボットサーバーが起動しました: http://localhost:${PORT}`);
  console.log(`環境変数ANTHROPIC_API_KEYが設定されているか確認してください`);
});
