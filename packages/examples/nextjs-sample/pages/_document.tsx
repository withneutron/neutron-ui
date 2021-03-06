import NextDoc, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps,
} from "next/document"
import {
  appFontLinks,
  appGlobalStyles,
  getCssText,
  globalStyles,
  appTheme,
  appDarkTheme,
  getInitialProps,
  InitialProps,
  getHtmlProps,
  FontLinks,
} from "@/ui"

function Document(props: DocumentProps & { initialProps: InitialProps }) {
  // Global styles
  globalStyles()
  appGlobalStyles()

  return (
    <Html {...getHtmlProps(props.initialProps, appTheme, appDarkTheme)}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <FontLinks links={appFontLinks} />
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
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
  const initialProps = getInitialProps(ctx)
  return {
    ...docProps,
    initialProps,
  }
}

export default Document
