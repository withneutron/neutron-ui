import { Html, Head, Main, NextScript } from "next/document"
import { appFontLinks, appGlobalStyles, getCssText, globalStyles } from "../config/ui"

export default function Document() {
  // Global styles
  globalStyles()
  appGlobalStyles()

  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {appFontLinks.map((font, index) => (
          <link
            key={index}
            href={font.href}
            rel={font.rel}
            crossOrigin={font.crossOrigin}
            as={font.as}
          />
        ))}
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
