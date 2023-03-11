import { GenerateApiInput } from '@/utils/types'
import { NextRequest } from 'next/server'
import { OpenAIStream, OpenAIStreamPayload } from '@/utils/OpenAIStream'
import { HOST_URL } from '@/utils/constants'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: NextRequest): Promise<Response> => {
  const {
    userInput,
    prompt: testPrompt,
    id,
  } = (await req.json()) as GenerateApiInput

  if (!testPrompt && !id) {
    console.log('No prompt or id in the request')
    return new Response('Invalid', { status: 400 })
  }

  if (!userInput) {
    return new Response('Invalid user input', { status: 400 })
  }

  let prompt = ''
  if (testPrompt) {
    prompt = testPrompt
  } else {
    if (!id) {
      console.log('No prompt or id in the request')
      return new Response('Invalid', { status: 400 })
    }
    const v = await fetchPrompt(id)
    prompt = v.prompt
  }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `${prompt} {${userInput}}` }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}

export default handler

function fetchPrompt(id: string) {
  return fetch(`${HOST_URL}/api/app-prompt`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PROMPT_SECRET}`,
    },
    method: 'POST',
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data as { prompt: string }
    })
}
