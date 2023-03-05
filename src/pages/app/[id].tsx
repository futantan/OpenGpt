/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Footer from '@/components/Footer'
import LoadingDots from '@/components/LoadingDots'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/db'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

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
  const { id, demoInput, description, hint, icon, name, prompt } =
    props.appConfig
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState(demoInput)
  const [generatedResults, setGeneratedResults] = useState<string>('')

  const resultRef = useRef<null | HTMLDivElement>(null)

  const scrollToResults = () => {
    if (resultRef.current !== null) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const generateResult = async (e: any) => {
    if (loading) {
      return
    }

    e.preventDefault()
    setGeneratedResults('')
    setLoading(true)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `${prompt} ${userInput}`,
      }),
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
    scrollToResults()
    setLoading(false)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center py-2">
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <div className="mb-20 flex w-full">
          <Link href="/">&#8592;首页</Link>
        </div>

        <h1 className="max-w-[708px] text-4xl font-bold text-slate-900 sm:text-6xl">
          {name}
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>

        <div className="w-full max-w-xl">
          <div className="mt-10 flex items-center space-x-3">
            <p className="text-left font-medium">{hint}</p>
          </div>

          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={4}
            className="my-5 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder={demoInput}
          />

          <button
            className="mt-8 rounded-xl bg-black px-8 py-2 font-medium text-white hover:bg-black/80 sm:mt-10"
            onClick={(e) => generateResult(e)}
            disabled={loading}
          >
            {loading ? <LoadingDots color="white" style="large" /> : '运行'}
          </button>

          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ duration: 2000 }}
          />

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
      <Footer />
    </div>
  )
}

export default OpenGptApp
