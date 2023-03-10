import {
  OpenAIStream,
  type OpenAIStreamPayload,
} from '../../utils/OpenAIStream'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const { userInput, id } = (await req.json()) as {
    userInput?: string
    id: string
  }

  if (!userInput || !id) {
    return new Response('No prompt in the request', { status: 400 })
  }

  const { prompt } = await fetchPrompt(id)

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
  // TODO: check if there is a better way to do this
  return fetch(`${process.env.DEPLOY_URL}/api/app-prompt`, {
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
