import * as React from "react"
import hash from "object-hash"
import {
  json,
  Link,
  NavLink,
  Links,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  LinksFunction,
  MetaFunction,
} from "remix"
import {
  UIProvider,
  useColors,
  Html,
  Row,
  FlexList,
  FlexListItem,
  Text,
  Column,
  ColorMode,
  IconName,
  Button,
  Heading,
  appTheme,
  appDarkTheme,
  Grid,
  globalStyles,
  getColorModeFromHeaders,
  getLanguageFromHeaders,
  IconButton,
  Locale,
  appGlobalStyles,
  appFontLinks,
  createTheme,
  ThemeConfig,
  dynamicThemeValues,
  dynamicDarkThemeValues,
  simulateRTL,
  getIsMobileFromHeaders,
} from "~ui"
import { AutoReload } from "~components/AutoReload"

export const loader: LoaderFunction = async ({ request }) => {
  console.log("!!! request.headers", request.headers)
  const colorMode = getColorModeFromHeaders(request.headers)
  const isMobile = getIsMobileFromHeaders(request.headers)
  const locale = getLanguageFromHeaders(request.headers)[0]
  return json({
    colorMode,
    isMobile,
    locale,
    themeConfig: dynamicThemeValues,
    darkThemeConfig: dynamicDarkThemeValues,
  })
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "/build/_assets/style-HFXO2GJM.css" }, appFontLinks]
}

export const meta: MetaFunction = () => {
  const description = "Neutron app development platform."
  return {
    description,
    keywords: "app, development, engineering, no-code, low-code",
  }
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  const docProps = useLoaderData()

  return (
    <Document {...docProps}>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  // TODO: Need to customize this
  // TODO: Figure out how to set the proper color mode here
  console.error(error)
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Hey, developer, you should replace this with what you want your users to see.</p>
        </div>
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  // TODO: Need to customize this
  // TODO: Figure out how to set the proper color mode here
  let caught = useCatch()
  let message
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>
      break
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  )
}

interface DocumentProps {
  children: React.ReactNode
  title?: string
  colorMode?: ColorMode
  isMobile?: boolean
  locale?: Locale
  themeConfig?: ThemeConfig
  darkThemeConfig?: ThemeConfig
}
function Document({
  children,
  title,
  colorMode,
  isMobile,
  locale,
  themeConfig,
  darkThemeConfig,
}: DocumentProps) {
  // Global styles
  globalStyles()
  appGlobalStyles()

  // Themes
  const themeHash = hash(themeConfig || {}) || "custom"
  const darkThemeHash = hash(darkThemeConfig || {}) || "custom"
  const theme = createTheme(`app-theme-${themeHash}`, themeConfig)
  const darkTheme = createTheme(`app-dark-theme-${darkThemeHash}`, darkThemeConfig)

  return (
    <UIProvider
      locale={simulateRTL ? Locale.he : locale}
      theme={themeConfig ? theme : appTheme}
      darkTheme={darkThemeConfig ? darkTheme : appDarkTheme}
      defaultColorMode={colorMode}
      isMobile={isMobile}
    >
      <Html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <AutoReload />
          <AutoReload port={9001} />
        </body>
      </Html>
    </UIProvider>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const { toggleColorMode, isDark } = useColors()
  return (
    <Grid h="fullVh" verticalPanels={{ "@initial": "14-11", "@bp1": "12-11" }}>
      <Row.header
        alignItems="center"
        px="9"
        bg="neutral3"
        wrap
        shadow="highSoft"
        justifyContent={{ "@initial": "spaceBetween", "@<bp1": "center" }}
      >
        <Heading.h1
          lineHeight="min"
          flat
          p="2"
          ml={{ "@bp1": "minus2" }}
          w={{ "@<bp1": "full" }}
          align={{ "@<bp1": "center" }}
        >
          <AppLogo />
        </Heading.h1>
        <Row.nav
          alignItems="center"
          gap="6"
          w={{ "@<bp1": "full" }}
          justifyContent={{ "@<bp1": "center" }}
        >
          <Row aria-label="Main navigation" alignItems="center">
            <FlexList gap="2">
              <FlexListItem>
                <Button size="small" as={NavLink} prefetch="intent" to="/" variant="ghost">
                  Home
                </Button>
              </FlexListItem>
              <FlexListItem>
                <Button
                  size="small"
                  as={NavLink}
                  prefetch="intent"
                  to="/demos/sample"
                  variant="ghost"
                >
                  Sample
                </Button>
              </FlexListItem>
              <FlexListItem>
                <Button
                  size="small"
                  as={NavLink}
                  prefetch="intent"
                  to="/demos/actions"
                  variant="ghost"
                >
                  Actions
                </Button>
              </FlexListItem>
            </FlexList>
          </Row>
          <IconButton
            square
            variant="subtle"
            size="small"
            onPress={toggleColorMode}
            iconName={isDark ? IconName.sun : IconName.moon}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          />
        </Row.nav>
      </Row.header>
      <Column.main p="9" pb="13">
        {children}
      </Column.main>
      <Row.footer alignItems="center" justifyContent="center" px="9" bg="neutral3">
        <Text>&copy; Neutron</Text>
      </Row.footer>
    </Grid>
  )
}

function AppLogo() {
  const { isDark } = useColors()
  const bgDark = "#00A69C"
  const fgDark = "#04B7A6"
  const bgLight = "#007267"
  const fgLight = "#008275"
  const base = {
    bg: isDark ? bgDark : bgLight,
    fg: isDark ? fgDark : fgLight,
  }

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      height="30px"
      viewBox="0 0 400 78.393"
      enableBackground="new 0 0 400 78.393"
      xmlSpace="preserve"
      aria-label="Neutron logo"
    >
      <g>
        <path
          fill={base.bg}
          d="M0,66.702c0,3.208,1.294,6.113,3.386,8.226c-0.005-0.006-0.01-0.011-0.016-0.017
            c0.018,0.02,0.035,0.039,0.054,0.058c0.021,0.02,0.041,0.038,0.062,0.059C3.476,75.019,3.468,75.009,3.458,75
            c2.113,2.097,5.021,3.393,8.232,3.393c3.208,0,6.112-1.294,8.225-3.387c-0.007,0.007-0.013,0.015-0.02,0.021
            c0.02-0.02,0.039-0.038,0.059-0.057c0.001-0.001,0.002-0.002,0.004-0.003l14.996-14.997L0,25.017V66.702z M75.024,3.486
            l0.056,0.056c-0.037-0.039-0.073-0.079-0.111-0.117c-0.037-0.037-0.076-0.071-0.113-0.108c0.02,0.019,0.038,0.038,0.058,0.058
            C72.802,1.289,69.903,0,66.702,0c-3.188,0-6.076,1.28-8.185,3.351c0.011-0.012,0.021-0.024,0.032-0.035
            c-0.036,0.036-0.074,0.07-0.111,0.106c-0.001,0.001-0.002,0.002-0.004,0.003L43.438,18.422l34.954,34.954V11.691
            C78.393,8.492,77.106,5.597,75.024,3.486z"
        />
        <path
          fill={base.fg}
          d="M185.783,24.969c-3.151-1.714-6.72-2.572-10.703-2.572c-4.135,0-7.791,0.884-10.968,2.647
            c-3.177,1.766-5.648,4.287-7.413,7.564c-1.766,3.279-2.647,7.086-2.647,11.422c0,4.287,0.895,8.069,2.686,11.347
            c1.789,3.278,4.285,5.812,7.488,7.602c3.202,1.791,6.819,2.686,10.854,2.686c4.993,0,9.202-1.298,12.633-3.896
            c3.429-2.597,5.748-5.912,6.959-9.947h-11.423c-1.664,3.38-4.462,5.068-8.396,5.068c-2.724,0-5.019-0.856-6.884-2.571
            c-1.866-1.714-2.925-4.085-3.177-7.111h30.635c0.201-1.21,0.303-2.571,0.303-4.084c0-4.085-0.87-7.703-2.609-10.855
            C191.381,29.117,188.935,26.684,185.783,24.969z M164.868,40.097c0.403-2.823,1.5-5.029,3.291-6.618
            c1.789-1.589,3.996-2.383,6.618-2.383c2.773,0,5.118,0.82,7.035,2.458c1.916,1.64,2.899,3.82,2.95,6.543H164.868z M231.5,46.149
            c0,3.328-0.832,5.889-2.496,7.678c-1.664,1.791-3.959,2.686-6.883,2.686c-2.875,0-5.144-0.895-6.809-2.686
            c-1.664-1.789-2.496-4.35-2.496-7.678V23.077h-10.59v24.584c0,3.732,0.719,6.947,2.156,9.645c1.438,2.698,3.415,4.74,5.938,6.127
            c2.521,1.388,5.421,2.08,8.699,2.08c2.571,0,4.954-0.518,7.148-1.551c2.193-1.033,3.971-2.458,5.332-4.273v5.295h10.666V23.077
            H231.5V46.149z M131.246,22.473c-2.623,0-5.03,0.518-7.224,1.551c-2.194,1.034-3.998,2.458-5.408,4.273v-5.22h-10.591v41.906
            h10.591V41.837c0-3.328,0.844-5.887,2.533-7.678c1.689-1.789,3.996-2.686,6.922-2.686c2.874,0,5.144,0.896,6.808,2.686
            c1.664,1.791,2.496,4.35,2.496,7.678v23.146h10.59V40.4c0-5.647-1.539-10.047-4.614-13.199
            C140.272,24.049,136.238,22.473,131.246,22.473z M265.312,12.715h-10.665v10.362h-4.992v8.699h4.992v20.196
            c0,8.674,4.463,13.011,13.389,13.011h6.656v-8.926h-4.917c-1.614,0-2.761-0.314-3.441-0.945c-0.681-0.63-1.021-1.651-1.021-3.063
            V31.777h9.38v-8.699h-9.38V12.715z M395.386,27.2c-3.076-3.151-7.11-4.728-12.103-4.728c-2.623,0-5.03,0.518-7.224,1.551
            c-2.193,1.034-3.998,2.458-5.408,4.273v-5.22h-10.591v41.906h10.591V41.837c0-3.328,0.844-5.887,2.533-7.678
            c1.689-1.789,3.996-2.686,6.922-2.686c2.874,0,5.144,0.896,6.808,2.686c1.664,1.791,2.496,4.35,2.496,7.678v23.146H400V40.4
            C400,34.752,398.461,30.353,395.386,27.2z M293.755,29.583v-6.506h-10.591v41.906h10.591V44.107c0-3.883,0.844-6.606,2.533-8.17
            c1.689-1.562,4.198-2.345,7.526-2.345h2.799V22.473c-2.824,0-5.332,0.631-7.526,1.891
            C296.894,25.624,295.116,27.365,293.755,29.583z M343.142,25.082c-3.279-1.789-6.935-2.686-10.969-2.686
            c-4.035,0-7.69,0.896-10.968,2.686c-3.278,1.791-5.862,4.324-7.753,7.603c-1.892,3.278-2.837,7.061-2.837,11.346
            c0,4.287,0.919,8.069,2.761,11.347c1.84,3.278,4.374,5.812,7.602,7.602c3.227,1.791,6.857,2.686,10.893,2.686
            c4.085,0,7.778-0.895,11.082-2.686c3.303-1.789,5.925-4.323,7.867-7.602c1.94-3.277,2.912-7.06,2.912-11.347
            c0-4.285-0.946-8.067-2.837-11.346C349.003,29.406,346.419,26.873,343.142,25.082z M341.325,50.839
            c-1.009,1.865-2.357,3.265-4.046,4.197c-1.69,0.934-3.493,1.399-5.409,1.399c-3.025,0-5.534-1.07-7.526-3.215
            c-1.992-2.143-2.987-5.206-2.987-9.19c0-3.982,1.021-7.047,3.063-9.19c2.042-2.143,4.576-3.215,7.602-3.215
            c3.026,0,5.585,1.072,7.678,3.215c2.092,2.144,3.14,5.208,3.14,9.19C342.839,46.704,342.334,48.974,341.325,50.839z M19.956,3.424
            C17.674,1.142,14.683,0,11.69,0S5.706,1.142,3.424,3.424c-4.565,4.565-4.565,11.967,0,16.532l55.013,55.013
            c2.282,2.282,5.274,3.424,8.266,3.424c2.992,0,5.984-1.142,8.267-3.424c4.565-4.565,4.565-11.967,0-16.532L19.956,3.424z"
        />
      </g>
    </svg>
  )
}
