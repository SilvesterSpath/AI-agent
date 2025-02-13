import 'dotenv/config'
import { runAgent } from './src/agent'
import { tools } from './src/tools'
import { addMessages, getMessages } from './src/memory'
import { runLLM } from './src/llm'

const userMessage = process.argv.slice(2).join(' ')

if (!userMessage.trim()) {
  console.error('Please provide a message')
  process.exit(1)
}
console.log('User Input:', userMessage)

await addMessages([{ role: 'user', content: userMessage }])

const messages = await getMessages()

const response = await runLLM({
  messages,
  tools,
})

await addMessages([response])

console.log(response)
