import { Container } from '@/components/Container'
import { useState } from 'react'

export const CustomOpenAIKeyForm = () => {
  const [showOpenAIForm, setShowOpenAIForm] = useState(false)

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
                <div className="flex flex-col gap-3 text-sm font-medium leading-6 text-gray-900">
                  <div>
                    为了回馈开源社区，也方便大家的使用，我们早期支持使用自己的
                    API key
                  </div>

                  <div>
                    但是最终移除了对自定义 key 的支持。因为之前自定义 key
                    可以绕开所有限制，有人利用我们为大家提供的这一功能，滥用
                    API，将 OpenGPT
                    当做免费的服务器使用，给我们造成了非常高的成本。
                  </div>

                  <div>非常抱歉，不得已为之。</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
