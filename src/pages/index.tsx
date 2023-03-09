import AppList from '@/components/AppList'
import { Header } from '@/components/Header'
import Layout from '@/components/Layout'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/db'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

type App = {
  id: string
  name: string
  description: string
  icon: string
}
type PageProps = { apps: App[] }
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
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { apps } = props

  return (
    <>
      <Header />
      <main>
        <Layout>
          <div className="mb-2 flex justify-end">
            <Link
              href="/app/new"
              className="rounded-full bg-green-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              创建应用
            </Link>
          </div>
          <AppList list={apps} />
        </Layout>
        {/* <Hero /> */}
        {/* <PrimaryFeatures /> */}
        {/* <SecondaryFeatures /> */}
        {/* <CallToAction /> */}
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        {/* <Faqs /> */}
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default Home
