import { zodFunction } from 'openai/helpers/zod'
import { z } from 'zod'
import type { AIMessage } from '../types'
import { openai } from './ai'
import { systemPrompt } from './systemPrompt'

export const runLLM = async ({
  model = 'gpt-3.5-turbo',
  messages,
  temperature = 0.1,
  tools,
}: {
  messages: AIMessage[]
  temperature?: number
  model?: string
  tools?: { name: string; parameters: z.AnyZodObject }[]
}) => {
  const formattedTools = tools?.map((tool) => zodFunction(tool))
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages,
    ],
    temperature,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })

  return response.choices[0].message
}

// This is all I need to hit an AI model with a prompt and get a response back.
/* 
import {openai} from './ai'

export const runLLM = async ({}: {}) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: 'Who won the world series in 2020?',
      },
    ],
    temperature: 0.1,
  })

  return response.choices[0].message
 */
