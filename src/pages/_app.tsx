import { Analytics } from '@vercel/analytics/react'
import { type Session } from 'next-auth'
import { DefaultSeo } from 'next-seo'
import { type AppType } from 'next/app'

import { api } from '@/utils/api'

import '@/styles/globals.css'
import { DEFAULT_SEO_CONFIG } from '@/utils/seoConfig'
import { Toaster } from 'react-hot-toast'
import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Analytics />
      {/* <SessionProvider session={session}> */}
      <DefaultSeo {...DEFAULT_SEO_CONFIG} />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      {/* </SessionProvider> */}
    </>
  )
}

export default api.withTRPC(appWithTranslation(MyApp))
