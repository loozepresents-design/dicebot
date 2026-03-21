
console.log("BOT FILE LOADED");

console.log("ENV TOKEN:", process.env.TOKEN);

// ===== Expressサーバー（Render用） =====
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("DiceBot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});

// ===== Discord Bot =====
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 起動時
client.on("ready", () => {
  console.log(`Bot ready: ${client.user.tag}`);
});

// メッセージ処理（これ1つだけ！）
client.on("messageCreate", message => {
  if (message.author.bot) return;

  console.log("受信:", message.content);

  if (message.content.startsWith("!dice")) {
    const result = Math.floor(Math.random() * 6) + 1;
    message.channel.send(`${result}`);
  }
});

// ログイン
client.login(process.env.TOKEN)
  .then(() => console.log("ログイン成功"))
  .catch(err => console.error("ログイン失敗:", err));
