import type { AppContext, AppProps } from "next/app"
import Head from "next/head"
import Layout from "@/components/layout/Layout"
import { Locale, UIProvider, simulateRTL, appTheme, appDarkTheme, getInitialProps, Style } from "@/ui"
import App from "next/app"
import "@withneutron/quarks/styles"
import { QuarksProvider } from "@withneutron/quarks-react"

function MyApp({ Component, pageProps }: AppProps) {
  const { locale, colorMode, isMobile, isDebugMode, ...props } = pageProps

  return (
    <UIProvider
      locale={simulateRTL ? Locale.he : locale}
      theme={appTheme}
      darkTheme={appDarkTheme}
      defaultColorMode={colorMode}
      isMobile={isMobile}
      isDebugMode={isDebugMode}
    >
      <QuarksProvider
        defaultColorMode={colorMode}
        isMobile={isMobile}
        isDebugMode={isDebugMode}
        queryOverrides={{
          sm: 680,
          md: 1024,
        }}
      >
        <Style />
        <Head>
          <title>Next.js + Neutron UI +++</title>
          <meta name="description" content="Sample Next.js app, using NeutronUI" />
        </Head>
        <Layout>
          <Component {...props} />
        </Layout>
      </QuarksProvider>
    </UIProvider>
  )
}
MyApp.displayName = "MyApp"

MyApp.getInitialProps = async (AppContext: AppContext) => {
  const appProps = await App.getInitialProps(AppContext)
  const pageProps = {
    ...getInitialProps(AppContext.ctx, appProps),
    isDebugMode: AppContext.router.query.debugmode === "1",
  }
  return {
    ...appProps,
    pageProps,
  }
}

export default MyApp
