import TelegramBot from 'node-telegram-bot-api'

let bot: null | TelegramBot = null

/**
 * Telegram Bot
 */
export function getTelegramBot() {
  if (bot === null) {
    if (process.env.TELEGRAM_BOT_TOKEN) {
      // Initialize the Telegram bot
      bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })
      // log received messages
      bot.on('message', (msg) => {
        console.log(msg)
      })
    }
  }
  return bot
}

export const sendMessage = async (message: string) => {
  const bot = getTelegramBot()
  if (bot !== null && process.env.TELEGRAM_ID) {
    bot.sendMessage(process.env.TELEGRAM_ID, message)
  } else {
    console.log('Telegram bot not configured.')
  }
}
