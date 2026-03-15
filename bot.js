const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(3000, () => {
  console.log("Server running");
});

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const token = "";

client.on("messageCreate", message => {

  if (message.author.bot) return;

  if (message.content === "!dice") {

    const dice = Math.floor(Math.random() * 6) + 1;

    message.reply("🎲 " + dice);

  }

});

client.login(process.env.TOKEN);
