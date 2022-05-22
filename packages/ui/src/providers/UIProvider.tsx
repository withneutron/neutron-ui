import type { ReactElement, ReactNode, RefObject } from "react"
import {
  createRef,
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react"
import { SSRProvider } from "@react-aria/ssr"
import { useLocale, I18nProvider } from "@react-aria/i18n"
import { ClientElement, Locale } from "../shared/models/models"
import { ColorMode, DEFAULT_COLOR_MODE, DELAYS } from "../shared/models/theme.models"
import { baseDarkTheme, baseTheme, Theme } from "../config/stitches.config"
import { useMediaQuery } from "../hooks/useMediaQuery"
import "../config/styles.css"
import { exampleClass, themeClass } from "../config/styles.css"

// NESTABLE NEUTRON THEME PROVIDER ////////////////////////////////////////////
export interface ThemeContextProps {
  isDark: boolean
  ref: RefObject<ClientElement>
  theme: Theme
  darkTheme?: Theme
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDark: DEFAULT_COLOR_MODE === "dark",
  ref: createRef(),
  theme: baseTheme,
  darkTheme: baseDarkTheme,
})

interface UIThemeProps extends Omit<ThemeContextProps, "isDark" | "ref"> {
  children: ReactNode
  isRoot?: boolean
}

export function UITheme({
  theme,
  darkTheme = baseDarkTheme,
  children,
  isRoot = false,
}: UIThemeProps): ReactElement {
  const { isDark = DEFAULT_COLOR_MODE === "dark" } = useContext(UIContext)
  const ref = useRef<ClientElement>(null)
  const className = isDark ? String(darkTheme) : String(theme)
  return (
    <ThemeContext.Provider
      value={{
        isDark,
        ref,
        theme,
        darkTheme,
      }}
    >
      {isRoot && children}
      {!isRoot && (
        <section className={`${className} ${themeClass} ${exampleClass} TESTING123`} ref={ref}>
          <>{children}</>
        </section>
      )}
    </ThemeContext.Provider>
  )
}

// GLOBAL NEUTRON UI PROVIDER /////////////////////////////////////////////////
export interface UIContextProps {
  colorMode: ColorMode
  isDark: boolean
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
  locale?: Locale
  translations: UITranslations
  isTouchDevice: boolean
  constants: UIConstants
}

export const UIContext = createContext<UIContextProps>({
  colorMode: DEFAULT_COLOR_MODE,
  isDark: DEFAULT_COLOR_MODE === "dark",
  setColorMode: () => undefined,
  toggleColorMode: () => undefined,
  locale: Locale.en_US,
  translations: {} as UITranslations,
  isTouchDevice: false,
  constants: {} as UIConstants,
})

interface UIConstants {
  notificationRevealDelay: number
}

interface UITranslations {
  /** A description for assistive technology users, indicating that a long press action is available */
  tooltipLongPressDescription?: string
  /** A description for assistive technology users, indicating that a press action is available */
  tooltipPressDescription?: string
  /** Prefix for describing the increase button on number fields */
  incrementNumberField?: string
  /** Prefix for describing the decrease button on number fields */
  decrementNumberField?: string
  /** Message to inform users that a value is at its maximum */
  maximumReached?: string
  /** Message to inform users that a value is at its minimum */
  minimumReached?: string
}

interface UIProviderProps {
  children: ReactNode
  defaultColorMode?: ColorMode
  darkTheme?: Theme
  theme?: Theme
  locale?: Locale
  isMobile?: boolean
  translations?: UITranslations
  constants?: UIConstants
}

export function UIProvider(props: UIProviderProps): ReactElement {
  const {
    children,
    defaultColorMode = DEFAULT_COLOR_MODE,
    theme = baseTheme,
    darkTheme = baseDarkTheme,
    locale,
    isMobile = false,
    translations = {} as UITranslations,
    constants = {} as UIConstants,
  } = props
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode)
  const systemColorMode = useMediaQuery<ColorMode>(
    "(prefers-color-scheme: dark)",
    "dark",
    "light",
    defaultColorMode
  )
  const isTouchDevice = useMediaQuery("(hover: none)", isMobile)
  const systemColorTimer = useRef<ReturnType<typeof setTimeout>>()
  const { locale: systemLocale } = useLocale()
  const activeLocale =
    locale || Locale[systemLocale.replace("-", "_") as keyof typeof Locale] || Locale.en_US
  const mergedConstants = Object.assign(
    {
      notificationRevealDelay: DELAYS.notificationReveal,
    },
    constants
  )

  const toggleColorMode = useCallback(
    () => setColorMode((mode: ColorMode) => (mode === "light" ? "dark" : "light")),
    []
  )

  // Change the color mode, when the user system's color mode changes
  useEffect(() => {
    systemColorTimer.current = setTimeout(() => {
      setColorMode(systemColorMode)
    }, 250)
    return () => systemColorTimer.current && clearTimeout(systemColorTimer.current)
  }, [systemColorMode])

  return (
    <UIContext.Provider
      value={{
        colorMode,
        isDark: colorMode === "dark",
        setColorMode,
        toggleColorMode,
        locale: activeLocale,
        translations,
        isTouchDevice,
        constants: mergedConstants,
      }}
    >
      <SSRProvider>
        <I18nProvider locale={activeLocale}>
          <UITheme theme={theme} darkTheme={darkTheme} isRoot={true}>
            {children}
          </UITheme>
        </I18nProvider>
      </SSRProvider>
    </UIContext.Provider>
  )
}
