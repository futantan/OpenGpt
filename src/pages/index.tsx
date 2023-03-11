import AppList from '@/components/AppList'
import { Button } from '@/components/Button'
import { CallToAction } from '@/components/CallToAction'
import { Footer } from '@/components/Footer'
import { HandPointer } from '@/components/HandPointer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { SearchInput } from '@/components/SearchInput'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/db'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import type { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'

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
  const { apps } = props
  const [searchValue, setSearchValue] = useState('')

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
              <SearchInput
                setSearchValue={setSearchValue}
                placeholder={`Search ${apps.length} apps...`}
              />

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
