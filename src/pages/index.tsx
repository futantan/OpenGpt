import AppList from '@/components/AppList'
import AppListLoading from '@/components/AppListLoading'
import { Button } from '@/components/Button'
import { CallToAction } from '@/components/CallToAction'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { SearchInput } from '@/components/SearchInput'
import { api } from '@/utils/api'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as R from 'ramda'
import { useState } from 'react'

type App = {
  id: string
  name: string
  description: string
  icon: string
}
type PageProps = {}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    // TODO: disabled because of i18n, and switched to CSR
    // revalidate: 120, // In seconds
  }
}

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [sizeToShow, setSizeToShow] = useState(100)
  // @ts-ignore
  const { t } = useTranslation('common')

  const { isLoading, data: apps } = api.app.getAll.useQuery()

  const list = (
    searchValue
      ? apps!.filter(
          (app) =>
            app.name.includes(searchValue) ||
            app.description.includes(searchValue)
        )
      : apps
  ) as App[]

  const handleShowMore = () => {
    setSizeToShow(sizeToShow + 100)
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <Hero />
          <div className="w-full bg-slate-50 pb-20 pt-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 grid grid-cols-1 items-center justify-between pt-10 sm:grid-cols-3 sm:pt-0 ">
                <div />
                <SearchInput
                  setSearchValue={setSearchValue}
                  placeholder={'Search apps...'}
                />
                <div />
              </div>
              <AppListLoading />
            </div>
          </div>
          <CallToAction />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="w-full bg-slate-50 pb-20 pt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 grid grid-cols-1 items-center justify-between pt-10 sm:grid-cols-3 sm:pt-0 ">
              <div />
              <SearchInput
                setSearchValue={setSearchValue}
                placeholder={`Search ${apps!.length} apps...`}
              />
              <div />
            </div>
            <AppList list={R.take(sizeToShow, list)} />

            <div className="mt-10 flex justify-center">
              <Button color="blue" onClick={handleShowMore}>
                {t('load_more')}
              </Button>
            </div>
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
