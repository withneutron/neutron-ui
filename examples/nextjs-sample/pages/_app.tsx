import type { AppContext, AppProps } from "next/app"
import Head from "next/head"
import App from "next/app"
import "@withneutron/quarks/styles"
import { Column, QuarksProvider } from "@withneutron/quarks-react"
import { AppHeader } from "../components/AppHeader"

function MyApp({ Component, pageProps }: AppProps) {
  const { locale, colorMode, isMobile, isDebugMode, ...props } = pageProps

  return (
    <QuarksProvider defaultColorMode={colorMode} isMobile={isMobile} isDebugMode={isDebugMode}>
      <Head>
        <title>Neutron UI — Sample Next.js App</title>
        <meta name="description" content="Sample Next.js app, using NeutronUI" />
      </Head>
      <Column.Main
        css={{
          h: "100vh",
          w: "100%",
        }}
      >
        <AppHeader />
        <Column css={{ flex: "1" }}>
          <Component {...props} />
        </Column>
      </Column.Main>
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
