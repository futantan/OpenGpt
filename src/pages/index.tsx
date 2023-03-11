import { PlusCircleIcon } from '@heroicons/react/24/outline'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import AppList from '@/components/AppList'
import { Button } from '@/components/Button'
import { CallToAction } from '@/components/CallToAction'
import { Footer } from '@/components/Footer'
import { HandPointer } from '@/components/HandPointer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/db'

interface App {
  id: string
  name: string
  description: string
  icon: string
}
interface PageProps { apps: App[] }
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const caller = appRouter.createCaller({ prisma, session: null })
  const apps = await caller.app.getAll()

  return {
    props: {
      apps,
    },
  }
}

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { apps } = props

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="w-full bg-slate-50 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-2 flex items-center justify-end gap-4 py-10">
              <HandPointer />
              <Button variant="solid" color="blue" href="/app/new">
                <div className="flex items-center gap-2">
                  <PlusCircleIcon className="h-6 w-6"></PlusCircleIcon>
                  <span className="whitespace-nowrap">创建应用</span>
                </div>
              </Button>
            </div>
            <AppList list={apps} />
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
