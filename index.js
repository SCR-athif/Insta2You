const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with your own Telegram Bot token
const bot = new TelegramBot(process.env["bot"], { polling: true });

let isActive = false;


// Handle callback queries
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const callbackData = query.data;

  if (callbackData === 'activateBot') {
    isActive = true;
    bot.sendMessage(chatId, 'Activation successful. To begin downloading reels, please click on /download');
  }
});

// Message handler
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  if (isActive && messageText && messageText==`/start`) {
          bot.sendMessage(chatId, 'Activation already confirmed. Please click on "/download" to commence the reel downloading process.',);
  }
  else if (messageText && messageText==`/start`) {
          bot.sendMessage(chatId, 'Click the button below to activate the bot.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Activate Bot', callback_data: 'activateBot' }]
      ]
    }
  });
  }
   else if (isActive &&messageText && messageText==`/help`) {
  bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show available commands\n/download - Start downloading');
  }
        else if (isActive &&messageText && messageText==`/download`) {
      bot.sendMessage(chatId, 'Please provide the URL you would like to download from.');
  }
 else if (isActive && messageText && messageText.includes('https://www.insta')) {
    const modifiedText = messageText.replace(/instagram/gi, 'ddinstagram');
    bot.sendMessage(chatId, modifiedText);
  }
    else if (isActive)
    {
      bot.sendMessage(chatId,`Incorrect input. Please provide valid commands or a URL for downloading purposes.`)
    }
  else if (!isActive) {
    bot.sendMessage(chatId, 'Bot is currently inactive. Click /start to activate.');
  }
});
//Devoloped By SCR
