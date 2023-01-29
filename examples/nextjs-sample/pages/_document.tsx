import { getThemeFonts } from "@withneutron/quarks"
import NextDoc, { Html, Head, Main, NextScript, DocumentContext } from "next/document"

const { links } = getThemeFonts()

function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        {links.map((props, key) => (
          <link key={key} {...props} />
        ))}
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
