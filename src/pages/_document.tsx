import { Head, Html, Main, NextScript } from 'next/document'

export default function MyDocument() {
  const title = 'OpenGPT - Create ChatGpt Application in seconds'
  const description =
    'Access a vast library of pre-built ChatGPT applications or create your own in just seconds, with OpenGPT platform'

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
