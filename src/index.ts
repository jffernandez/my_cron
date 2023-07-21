import 'dotenv/config'
import { getTelegramBot } from './bot'
import { start as cronStart, stop as cronStop } from './cron'

// Graceful shutdown
let shutdown = false
const gracefulShutdown = async () => {
  if (shutdown) {
    return
  }
  shutdown = true
  console.log('Server is shutting down...')
  cronStop()
  // wait for last messages to be sent
  await new Promise((resolve) => setTimeout(resolve, 1000))
  bot?.stopPolling()
  process.exit(0)
}

// Listen for shutdown signals
process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
  gracefulShutdown()
})

// init Telegram Bot
const bot = getTelegramBot()
if (bot) {
  bot.getMe().then((value) => {
    console.log(JSON.stringify(value, null, 2))
  })
} else {
  console.warn('Telegram Bot not configured!')
}

// start cron jobs
cronStart()
console.log('Ready!')
