import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { checkOpenApiKeyFormat } from '@/utils/checkOpenApiKeyFormat'
import { RATE_LIMIT_COUNT } from '@/utils/constants'
import { loadOpenAIKey, saveOpenAIKey } from '@/utils/localData'
import { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'

const Usage = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = loadOpenAIKey()
    }
  }, [])

  const handleSave = () => {
    const value = inputRef.current?.value || ''
    if (value === '') {
      // clear
      saveOpenAIKey(value)
    } else {
      if (checkOpenApiKeyFormat(value)) {
        saveOpenAIKey(value)
      } else {
        toast('API Key 格式不正确', { icon: '❌' })
      }
    }
  }

  return (
    <div>
      <Header />
      <main>
        <Container className="pt-20 pb-16 text-center lg:pt-32">
          <h1 className="font-display mx-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            Usage
          </h1>
          <p className="mx-auto mt-24 max-w-2xl text-lg tracking-tight text-slate-700">
            每天每个用户免费使用 {RATE_LIMIT_COUNT} 次哦，使用{' '}
            <a
              href="https://blog.futantan.com/openai-key"
              target="_blank"
              className="text-blue-500 underline"
            >
              自己的 API key 可以解除限制
            </a>
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Input
              className="min-w-[300px]"
              type="password"
              placeholder="粘贴你的 OpenAI API Key: sk-xxxxxx"
              ref={inputRef}
            />
            <Button
              variant="solid"
              color="blue"
              className="whitespace-nowrap"
              onClick={handleSave}
            >
              保存到本地
            </Button>
          </div>
        </Container>
        <div className="w-full bg-slate-50 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center justify-between pt-10 sm:grid-cols-3 sm:pt-0"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Usage
