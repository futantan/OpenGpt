import { useState } from 'react'

export const useGenerateResult = () => {
  const [generatedResults, setGeneratedResults] = useState<string>('')

  async function generate(
    body:
    | { userInput: string; id: string }
    | { userInput: string; prompt: string },
  ) {
    setGeneratedResults('')

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedResults(prev => prev + chunkValue)
    }
  }

  return { generatedResults, generate }
}
