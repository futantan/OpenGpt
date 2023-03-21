import { Container } from '@/components/Container'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

export const CustomOpenAIKeyForm = () => {
  const [showOpenAIForm, setShowOpenAIForm] = useState(false)
  const { t } = useTranslation('common')

  return (
    <>
      <Container className="pt-20 pb-16 text-center lg:pt-32">
        <div className="mx-auto mt-24 max-w-2xl tracking-tight text-slate-700">
          <div
            className="cursor-pointer text-sm text-slate-500 underline"
            onClick={() => setShowOpenAIForm(true)}
          >
            {t('has_openai_key')}
          </div>
        </div>

        {showOpenAIForm && (
          <div className="mx-auto mt-10 max-w-sm">
            <div className="text-left">
              <div className=" sm:col-span-2">
                <div className="flex flex-col gap-3 text-sm font-medium leading-6 text-gray-900">
                  <div>{t('has_openai_key')}</div>

                  <div>{t('custom_key_p2')}</div>

                  <div>{t('custom_key_p3')}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
