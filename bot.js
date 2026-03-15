// ===== Expressサーバー（Render用） =====
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("DiceBot is running");
});

app.listen(3000, () => {
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

// Botが起動したとき
client.on("ready", () => {
  console.log(`Bot ready: ${client.user.tag}`);
});

// メッセージを受け取ったとき
client.on("messageCreate", message => {
  if (message.author.bot) return;

  if (message.content === "!dice") {
    const result = Math.floor(Math.random() * 6) + 1;
    message.reply(`🎲 ダイス結果: ${result}`);
  }
});

// Renderの環境変数TOKENを使用
client.login(process.env.TOKEN);
