import NextDoc, { Html, Head, Main, NextScript, DocumentContext } from "next/document"

function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const docProps = await NextDoc.getInitialProps(ctx)
  return docProps
}

export default Document
