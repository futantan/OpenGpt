import { PlusCircleIcon } from '@heroicons/react/24/outline'
import type { GetStaticProps, InferGetServerSidePropsType } from 'next'
import type { ChangeEventHandler } from 'react'
import { useRef, useState } from 'react'
import AppList from '@/components/AppList'
import { Button } from '@/components/Button'
import { CallToAction } from '@/components/CallToAction'
import { Footer } from '@/components/Footer'
import { HandPointer } from '@/components/HandPointer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/db'

type App = {
  id: string
  name: string
  description: string
  icon: string
}
type PageProps = { apps: App[] }

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const caller = appRouter.createCaller({ prisma, session: null })
  const apps = await caller.app.getAll()

  return {
    props: {
      apps,
    },
    revalidate: 10, // In seconds
  }
}

const Home = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const isComposing = useRef(false)
  const [searchValue, setSearchValue] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value
    // 如果当前不处于中文输入法状态，则更新搜索词
    if (!isComposing.current) {
      setSearchValue(inputValue)
    }
  }

  const handleCompositionStart = () => {
    isComposing.current = true
  }

  const handleCompositionEnd = (event: any) => {
    const inputValue = event.target.value

    // 在中文输入法结束后，更新搜索词
    setSearchValue(inputValue)
    isComposing.current = false
  }

  const { apps } = props

  const list = searchValue
    ? apps.filter(
        (app) =>
          app.name.includes(searchValue) ||
          app.description.includes(searchValue)
      )
    : apps
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="w-full bg-slate-50 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center justify-between pt-10 sm:grid-cols-3 sm:pt-0">
              <div />
              <div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-600 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    onCompositionStart={handleCompositionStart}
                    onChange={handleChange}
                    onCompositionEnd={handleCompositionEnd}
                    className="block w-full rounded-lg border border-gray-300 bg-white p-4 pl-10 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                    placeholder={`Search ${apps.length} apps...`}
                  />
                </div>
              </div>

              <div className="mb-2 flex items-center justify-end gap-4 py-10">
                <HandPointer />
                <Button variant="solid" color="blue" href="/app/new">
                  <div className="flex items-center gap-2">
                    <PlusCircleIcon className="h-6 w-6"></PlusCircleIcon>
                    <span className="whitespace-nowrap">创建应用</span>
                  </div>
                </Button>
              </div>
            </div>
            <AppList list={list} />
          </div>
        </div>
        {/* <PrimaryFeatures /> */}
        {/* <SecondaryFeatures /> */}
        <CallToAction />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        {/* <Faqs /> */}
      </main>
      <Footer />
    </>
  )
}

export default Home
