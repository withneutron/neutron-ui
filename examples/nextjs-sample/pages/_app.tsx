import type { AppContext, AppProps } from "next/app"
import Head from "next/head"
import App from "next/app"
import "@withneutron/quarks/styles"
import { Box, QuarksProvider } from "@withneutron/quarks-react"

function MyApp({ Component, pageProps }: AppProps) {
  const { locale, colorMode, isMobile, isDebugMode, ...props } = pageProps

  return (
    <QuarksProvider
      defaultColorMode={colorMode}
      isMobile={isMobile}
      isDebugMode={isDebugMode}
      queryOverrides={{
        sm: 680,
        md: 1024,
      }}
    >
      <Head>
        <title>Next.js + Neutron UI +++</title>
        <meta name="description" content="Sample Next.js app, using NeutronUI" />
      </Head>
      <Box
        css={{
          p: {
            base: "$80",
            md: "$40",
            sm: "$20",
          },
        }}
      >
        <Component {...props} />
      </Box>
    </QuarksProvider>
  )
}
MyApp.displayName = "MyApp"

MyApp.getInitialProps = async (AppContext: AppContext) => {
  const appProps = await App.getInitialProps(AppContext)
  const pageProps = {
    isDebugMode: AppContext.router.query.debugmode === "1",
  }
  return {
    ...appProps,
    pageProps,
  }
}

export default MyApp
