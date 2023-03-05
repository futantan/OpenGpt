import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Create your own ChatGpt App in seconds."
          />
          <meta
            property="og:site_name"
            content="https://open-gpt-app.vercel.app/"
          />
          <meta
            property="og:description"
            content="Create your own ChatGpt App in seconds."
          />
          <meta
            property="og:title"
            content="Create ChatGpt Application in seconds"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Create ChatGpt Application in seconds"
          />
          <meta
            name="twitter:description"
            content="Create your own ChatGpt App in seconds."
          />
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
}

export default MyDocument
