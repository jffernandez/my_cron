import { sendMessage } from './bot'

export const recurringBuy = async () => {
  console.log('--- recurringBuy ---')
  sendMessage('Buy time!')
  console.log('--- recurringBuy done ---')
}
