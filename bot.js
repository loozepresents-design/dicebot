console.log("BOT FILE LOADED");

// ===== Express（Railway用：軽い生存確認） =====
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ===== Discord Bot =====
const { Client, GatewayIntentBits } = require("discord.js");

// エラーログ（落ち防止）
process.on("unhandledRejection", err => console.error(err));
process.on("uncaughtException", err => console.error(err));

// クライアント作成
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 起動時
client.once("ready", () => {
  console.log(`✅ Bot ready: ${client.user.tag}`);
});

// メッセージ処理
client.on("messageCreate", message => {
  if (message.author.bot) return;

  if (message.content.startsWith("!dice")) {
    const dice = ["⚀","⚁","⚂","⚃","⚄","⚅"];
    const result = Math.floor(Math.random() * 6);

    message.channel.send({
      content: `${dice[result]} ${result + 1}`
    });
  }
});

// TOKENチェック
if (!process.env.TOKEN) {
  console.error("❌ TOKENが設定されてない");
  process.exit(1);
}

// ログイン
client.login(process.env.TOKEN)
  .then(() => console.log("✅ ログイン成功"))
  .catch(err => {
    console.error("❌ ログイン失敗:", err);
    process.exit(1);
  });

// 生存ログ
setInterval(() => {
  console.log("still alive...");
}, 30000);
