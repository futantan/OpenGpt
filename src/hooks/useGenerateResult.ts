import { RATE_LIMIT_COUNT } from '@/utils/constants'
import { loadOpenAIKey } from '@/utils/localData'
import { GenerateApiInput } from '@/utils/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export const useGenerateResult = () => {
  const router = useRouter()
  const [generatedResults, setGeneratedResults] = useState<string>('')

  async function generate(body: GenerateApiInput) {
    setGeneratedResults('')

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, userKey: loadOpenAIKey() }),
    })

    if (!response.ok) {
      if (response.status === 429) {
        toast(
          `每个用户每天最多使用 ${RATE_LIMIT_COUNT} 次，更多用量正在支持中`,
          { icon: '🔴' }
        )
        router.push('/usage')
        return
      } else {
        throw new Error(response.statusText)
      }
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
  }

  return { generatedResults, generate }
}
