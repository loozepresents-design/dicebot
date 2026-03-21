console.log("BOT FILE LOADED");

// ===== Express（Render用：軽く生存確認だけ） =====
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// ===== Discord Bot =====
const { Client, GatewayIntentBits } = require("discord.js");

// エラーハンドリング（超重要）
process.on("unhandledRejection", err => {
  console.error("unhandledRejection:", err);
});
process.on("uncaughtException", err => {
  console.error("uncaughtException:", err);
});

// クライアント
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 起動確認
client.once("ready", () => {
  console.log(`✅ Bot ready: ${client.user.tag}`);
});

// メッセージ処理
client.on("messageCreate", message => {
  if (message.author.bot) return;

  console.log("受信:", message.content);

  if (message.content.startsWith("!dice")) {
    const result = Math.floor(Math.random() * 6) + 1;
    message.channel.send(`${result}`);
  }
});

// トークンチェック
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

// 生存確認ログ（Render対策）
setInterval(() => {
  console.log("still alive...");
}, 30000);
