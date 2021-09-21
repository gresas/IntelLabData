const { delay } = require('bluebird');
const telegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_IDS = process.env.TELEGRAM_CHAT_ID.split(',');

const bot = new telegramBot(TOKEN, {polling: true});

let chats = [...CHAT_IDS]

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Chat registrado com sucesso!");
  console.log(msg.chat.id);
});

const sendTelegramMessage = async (msg) => {
  for (let id of chats) {
    await bot.sendMessage(id, msg)
  }
};

module.exports = {
  sendTelegramMessage
};