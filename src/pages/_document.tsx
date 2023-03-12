import { Head, Html, Main, NextScript } from 'next/document'
export default function MyDocument() {
  const title = 'OpenGPT - Create ChatGpt Application in seconds'
  const description =
    '立即使用海量的 ChatGPT 应用，或在几秒钟内创建属于自己的应用。'

  return (
    <Html lang="en">
      <Head>
        <title>OpenGPT</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={description} />
        <meta
          property="og:site_name"
          content="https://open-gpt-app.vercel.app/"
        />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          property="og:image"
          content="https://open-gpt-app.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://open-gpt-app.vercel.app/og-image.png"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
