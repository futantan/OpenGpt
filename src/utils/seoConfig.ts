import { DefaultSeoProps } from 'next-seo'

export const SITE_DESC =
  '立即使用海量的 ChatGPT 应用，或在几秒钟内创建属于自己的应用。'
export const DEFAULT_SEO_CONFIG: DefaultSeoProps = {
  title: 'OpenGPT - Create ChatGpt Application in seconds',
  titleTemplate: '%s | OpenGPT',
  defaultTitle: 'OpenGPT - Create ChatGpt Application in seconds',
  description: SITE_DESC,
  openGraph: {
    images: [
      {
        url: 'https://open-gpt-app.vercel.app/og-image.png',
        alt: 'Og Image Alt',
      },
    ],
    type: 'website',
    locale: 'en_IE',
    url: 'https://open-gpt.app/',
    siteName: 'OpenGPT',
  },
  twitter: {
    handle: '@EclipsePrayer',
    site: 'https://open-gpt.app/',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.png',
    },
  ],
}
