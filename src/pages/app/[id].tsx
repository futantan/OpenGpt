import { Breadcrumb } from '@/components/Breadcrumb'
import Layout from '@/components/Layout'
import LoadingDots from '@/components/LoadingDots'
import { useGenerateResult } from '@/hooks/useGenerateResult'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/db'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next'
import { NextSeo } from 'next-seo'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type AppConfig = {
  id: string
  name: string
  description: string
  icon: string
  demoInput: string
  hint: string
}
type PageProps = { appConfig: AppConfig }

export const getStaticPaths: GetStaticPaths = async () => {
  const caller = appRouter.createCaller({ prisma, session: null })
  const idObjArr = await caller.app.getTopNAppIds(30)
  return {
    paths: idObjArr.map((v) => ({ params: { id: v.id } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<
  PageProps,
  { id: string }
> = async ({ params, locale }) => {
  const id = params?.id

  if (!id) {
    return { notFound: true } as any
  }

  const caller = appRouter.createCaller({ prisma, session: null })
  const appConfig = await caller.app.getById(id)

  if (!appConfig) {
    return { notFound: true } as any
  }
  return {
    props: {
      appConfig,
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

const OpenGptApp = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const { id, demoInput, description, icon, name } = props.appConfig
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState(demoInput)
  const { generate, generatedResults } = useGenerateResult()
  const { t } = useTranslation('common')

  const resultRef = useRef<null | HTMLDivElement>(null)

  const scrollToResults = () => {
    if (resultRef.current !== null) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleRun = async (e: any) => {
    if (loading) {
      return
    }
    setLoading(true)

    e.preventDefault()
    await generate({ userInput, id })

    scrollToResults()
    setLoading(false)
  }

  return (
    <>
      <NextSeo
        title={name}
        description={description}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`,
          },
        ]}
      />
      <Layout>
        <Breadcrumb pages={[]} />
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-2">
          <main className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
            <h1 className="max-w-[708px] text-4xl font-bold text-slate-900 sm:text-6xl">
              {name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {description}
            </p>
            <div className="w-full max-w-xl">
              {/* <div className="mt-10 flex items-center space-x-3">
              <p className="text-left font-medium">{hint}</p>
            </div> */}
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows={4}
                className="my-5 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder={demoInput}
              />
              <button
                className="mt-8 rounded-xl bg-black px-8 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
                onClick={(e) => handleRun(e)}
                disabled={loading}
              >
                {loading ? (
                  <LoadingDots color="white" style="large" />
                ) : (
                  t('run')
                )}
              </button>
              <div className="my-10 w-full space-y-10">
                {generatedResults && (
                  <div className="flex flex-col gap-8">
                    <h2
                      className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl"
                      ref={resultRef}
                    >
                      {t('result')}
                    </h2>
                    <div className="flex w-full flex-col items-center justify-center space-y-8">
                      <div
                        className="w-full cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedResults)
                          toast(t('copied_success'), {
                            icon: '✂️',
                          })
                        }}
                      >
                        <p className="whitespace-pre-line text-left">
                          {generatedResults}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  )
}

export default OpenGptApp
