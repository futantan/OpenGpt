import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Input } from '@/components/Input'
import { loadOpenAIKey, saveOpenAIKey } from '@/utils/localData'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export const CustomOpenAIKeyForm = () => {
  const [showOpenAIForm, setShowOpenAIForm] = useState(false)
  const openAIKeyInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (openAIKeyInputRef.current) {
      openAIKeyInputRef.current.value = loadOpenAIKey()
    }
  }, [showOpenAIForm])

  const handleClear = () => {
    toast('数据已清空', { icon: '🗑️' })
    saveOpenAIKey('')

    if (openAIKeyInputRef.current) {
      openAIKeyInputRef.current.value = ''
    }
  }

  const handleSave = async () => {
    const value = openAIKeyInputRef.current?.value || ''
    if (value === '') {
      return
    }

    saveOpenAIKey(value)
    toast('已保存', { icon: '✅' })
  }

  return (
    <>
      <Container className="pt-20 pb-16 text-center lg:pt-32">
        <div className="mx-auto mt-24 max-w-2xl tracking-tight text-slate-700">
          <div
            className="cursor-pointer text-sm text-slate-500 underline"
            onClick={() => setShowOpenAIForm(true)}
          >
            拥有 OpenAI API key？
          </div>
        </div>

        {showOpenAIForm && (
          <div className="mx-auto mt-10 max-w-sm">
            <div className="text-left">
              <div className=" sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Open AI key
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <Input
                    type="text"
                    className="w-full"
                    placeholder="粘贴你的 OpenAI API Key: sk-xxxxxx"
                    ref={openAIKeyInputRef}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-end gap-3 px-4 sm:px-0">
              <Button variant="outline" color="slate" onClick={handleClear}>
                清除
              </Button>
              <Button variant="solid" color="blue" onClick={handleSave}>
                保存
              </Button>
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
