import { useState } from 'react'

export const useGenerateResult = () => {
  const [generatedResults, setGeneratedResults] = useState<string>('')

  async function generate({
    userInput,
    id,
  }: {
    userInput: string
    id: string
  }) {
    setGeneratedResults('')

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, userInput }),
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
      setGeneratedResults((prev) => prev + chunkValue)
    }
    // scrollToResults()
    // setLoading(false)
  }

  return { generatedResults, generate }
}
