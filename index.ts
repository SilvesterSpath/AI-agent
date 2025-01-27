import 'dotenv/config'
import { runAgent } from './src/agent'
import { tools } from './src/tools'

const userMessage = process.argv.slice(2).join(' ')

if (!userMessage.trim()) {
  console.error('Please provide a message')
  process.exit(1)
}
console.log('User Input:', userMessage)

const messages = await runAgent({
  userMessage,
  tools,
})
