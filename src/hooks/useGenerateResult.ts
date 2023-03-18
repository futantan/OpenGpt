import { GenerateApiInput } from '@/utils/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { loadLicenseKey } from './../utils/localData'
import { useTranslation } from 'next-i18next'

export const useGenerateResult = () => {
  const router = useRouter()
  const [generatedResults, setGeneratedResults] = useState<string>('')
  const { t } = useTranslation('common')

  async function generate(body: GenerateApiInput) {
    setGeneratedResults('')

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        userKey: loadLicenseKey(),
      }),
    })

    if (!response.ok) {
      if (response.status === 429) {
        toast(t('runout_today'), { icon: '🔴' })
        router.push('/usage')
        return
      } else if (response.status === 439) {
        toast(t('license_wrong'), { icon: '🔴' })
        router.push('/usage')
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
