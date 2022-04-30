import { GetServerSideProps } from "next"
import type { AppProps } from "next/app"
import Head from "next/head"
import {
  getColorModeFromHeaders,
  getIsMobileFromHeaders,
  getLanguageFromHeaders,
  Locale,
  dynamicThemeValues,
  dynamicDarkThemeValues,
  globalStyles,
  appGlobalStyles,
  createTheme,
  UIProvider,
  simulateRTL,
  appTheme,
  appDarkTheme,
  appFontLinks,
  getCssText,
} from "../config/ui"

export const getServerSideProps: GetServerSideProps = async context => {
  const { req, defaultLocale } = context
  const colorMode = getColorModeFromHeaders(req)
  const isMobile = getIsMobileFromHeaders(req)
  const locale = getLanguageFromHeaders(req)[0] || (defaultLocale as Locale)

  return {
    props: {
      colorMode,
      isMobile,
      locale: locale ?? defaultLocale,
      themeConfig: dynamicThemeValues,
      darkThemeConfig: dynamicDarkThemeValues,
    },
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const { themeConfig, darkThemeConfig, locale, colorMode, isMobile } = pageProps
  // Global styles
  globalStyles()
  appGlobalStyles()

  // Themes
  const theme = createTheme(`app-theme-custom`, themeConfig)
  const darkTheme = createTheme(`app-dark-theme-custom`, darkThemeConfig)

  return (
    <UIProvider
      locale={simulateRTL ? Locale.he : locale}
      theme={themeConfig ? theme : appTheme}
      darkTheme={darkThemeConfig ? darkTheme : appDarkTheme}
      defaultColorMode={colorMode}
      isMobile={isMobile}
    >
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
      <Component {...pageProps} />
    </UIProvider>
  )
}

export default MyApp
