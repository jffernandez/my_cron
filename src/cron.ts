import { CronJob } from 'cron'
import { recurringBuy } from './buy'
import { sendMessage } from './bot'

console.log('Create cron jobs...')
let timer: NodeJS.Timeout | null = null

const heartbeatJob = new CronJob('0 */1 * * * *', async () => {
  console.log('Heartbeat', new Date().toLocaleTimeString('es-ES'))
})

const getRandomDelay = (min: number, max: number) => Math.random() * (max - min) + min

const randJob = new CronJob('0 */5 * * * *', async () => {
  console.log('--- randJob ---')
  const delay = getRandomDelay(1, 4) * 60 * 1000 // Convert to milliseconds
  timer = setTimeout(recurringBuy, delay)
  console.log(`--- randJob scheduled with ${Math.round(delay / 1000)} seconds delay ---`)
})

export function start() {
  // start all cron jobs
  heartbeatJob.start()
  randJob.start()
  console.log('Cron started!')
  sendMessage('Service started!')
}

export function stop() {
  heartbeatJob.stop()
  randJob.stop()
  if (timer) clearTimeout(timer)
  console.log('Cron stopped!')
  sendMessage('Service halted!')
}
