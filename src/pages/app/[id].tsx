import { Breadcrumb } from '@/components/Breadcrumb'
import Layout from '@/components/Layout'
import LoadingDots from '@/components/LoadingDots'
import { useGenerateResult } from '@/hooks/useGenerateResult'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/db'
import { api } from '@/utils/api'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

type AppConfig = {
  id: string
  name: string
  description: string
  icon: string
  demoInput: string
  prompt: string // TODO: check if this is needed in client
  hint: string
}
type PageProps = { appConfig: AppConfig }
export const getServerSideProps: GetServerSideProps<
  PageProps,
  { id: string }
> = async ({ params }) => {
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
    },
  }
}

const OpenGptApp = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { id, demoInput, description, icon, name, prompt } = props.appConfig
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState(demoInput)
  const { generate, generatedResults } = useGenerateResult()

  const incUsage = api.app.incUsage.useMutation()

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
    await generate({ userInput, prompt })
    incUsage.mutate(id)

    scrollToResults()
    setLoading(false)
  }

  return (
    <Layout>
      <Breadcrumb pages={[]} />

      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-2">
        <Head>
          <title>{name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
          <h1 className="max-w-[708px] text-4xl font-bold text-slate-900 sm:text-6xl">
            {name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>

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
              {loading ? <LoadingDots color="white" style="large" /> : '运行'}
            </button>

            <div className="my-10 w-full space-y-10">
              {generatedResults && (
                <div className="flex flex-col gap-8">
                  <h2
                    className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl"
                    ref={resultRef}
                  >
                    结果
                  </h2>
                  <div className="flex w-full flex-col items-center justify-center space-y-8">
                    <div
                      className="w-full cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedResults)
                        toast('Result copied to clipboard', {
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
  )
}

export default OpenGptApp
