/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Footer from '@/components/Footer'
import LoadingDots from '@/components/LoadingDots'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

const applicationName = 'Generate your next Twitter bio using chatGPT'
const hint = 'Copy your current bio (or write a few sentences about yourself).'
const demoInput =
  'e.g. Senior Developer Advocate @vercel. Tweeting about web development, AI, and React / Next.js. Writing nutlope.substack.com.'
const applicationPrompt =
  'Generate 1 Professional twitter biographies with no hashtags and clearly Make sure generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: '

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [generatedResults, setGeneratedResults] = useState<string>('')

  const resultRef = useRef<null | HTMLDivElement>(null)

  const scrollToResults = () => {
    if (resultRef.current !== null) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const prompt = `${applicationPrompt} ${userInput}`

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
        prompt,
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
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center py-2">
      <Head>
        <title>{applicationName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <h1 className="max-w-[708px] text-4xl font-bold text-slate-900 sm:text-6xl">
          {applicationName}
        </h1>

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
        </div>

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />

        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
        <div className="my-10 space-y-10">
          {generatedResults && (
            <>
              <div>
                <h2
                  className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl"
                  ref={resultRef}
                >
                  运行结果
                </h2>
              </div>
              <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8">
                <div
                  className="cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedResults)
                    toast('Result copied to clipboard', {
                      icon: '✂️',
                    })
                  }}
                >
                  <p>{generatedResults}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
