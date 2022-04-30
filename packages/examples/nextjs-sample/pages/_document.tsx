import { Html, Head, Main, NextScript } from "next/document"
import { globalStyles, appGlobalStyles, appFontLinks, getCssText } from "../config/ui"

export default function Document() {
  // Global styles
  globalStyles()
  appGlobalStyles()

  return (
    <Html>
      <Head>
        <title>Next.js + Neutron UI</title>
        <meta name="description" content="Sample Next.js app, using NeutronUI" />
        <link rel="icon" href="/favicon.ico" />
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />

        {appFontLinks.map((font, index) => (
          <link
            key={index}
            href={font.href}
            rel={font.rel}
            crossOrigin={font.crossOrigin}
            as={font.as}
          />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
