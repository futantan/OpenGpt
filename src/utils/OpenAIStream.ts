import { activateLicenseKey } from '@/utils/lemon'
import {
  createParser,
  type ParsedEvent,
  type ReconnectInterval,
} from 'eventsource-parser'
import { MAX_TOKENS } from './constants'
import { selectApiKeyOrActivateLicenseKey } from './selectApiKeyOrActivateLicenseKey'

export type ChatGPTAgent = 'user' | 'system'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

export interface OpenAIStreamPayload {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  n: number
}

export async function OpenAIStream(
  payload: OpenAIStreamPayload,
  userKey?: string
) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  let counter = 0

  if (userKey) {
    console.log('user is using custom openai key')
  }

  const { isUsingLicense, key } = await selectApiKeyOrActivateLicenseKey(
    userKey
  )
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    method: 'POST',
    body: JSON.stringify({
      ...payload,
      max_tokens: isUsingLicense ? MAX_TOKENS * 2 : MAX_TOKENS,
    }),
  })

  if (res.status !== 200) {
    const errorJson = await res.json()
    throw new Error(
      `OpenAI API Error [${res.statusText}]: ${errorJson.error?.message}`
    )
  }

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      async function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            if (isUsingLicense) {
              await activateLicenseKey(userKey || '')
            }
            controller.close()

            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            counter++
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}
