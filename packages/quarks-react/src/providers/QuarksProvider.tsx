import type { ReactElement, ReactNode } from "react"
import { createContext, useRef, useCallback, useEffect, useState } from "react"
import { useMediaQuery } from "../hooks/useMediaQuery"
import {
  ColorMode,
  ConditionKeys,
  conditionsMap,
  DEFAULT_COLOR_MODE,
  BreakpointOverrides,
  ThemeOverrides,
  SemanticColorOverrides,
  tokenValue,
} from "@withneutron/quarks"
import { useThemeStyle } from "../hooks"
import { useContextConditions } from "./QuarksProvider.utils"

export const CssConditionsContext = createContext<Record<ConditionKeys, boolean>>(
  Object.keys(conditionsMap).reduce((output, key) => {
    output[key as ConditionKeys] = false
    return output
  }, {} as Record<ConditionKeys, boolean>)
)

// GLOBAL QUARKS PROVIDER /////////////////////////////////////////////////
export interface QuarksContextProps {
  colorMode: ColorMode
  isDark: boolean
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
  isTouchDevice: boolean
  tokenValue: typeof tokenValue
}

export const QuarksContext = createContext<QuarksContextProps>({
  colorMode: DEFAULT_COLOR_MODE,
  isDark: false,
  setColorMode: () => undefined,
  toggleColorMode: () => undefined,
  isTouchDevice: false,
  tokenValue,
})

interface QuarksProviderProps {
  children: ReactNode
  defaultColorMode?: ColorMode
  isMobile?: boolean
  isDebugMode?: boolean
  queryOverrides?: BreakpointOverrides
  themeOverrides?: ThemeOverrides
  semanticColorOverrides?: SemanticColorOverrides
}

export function QuarksProvider(props: QuarksProviderProps): ReactElement {
  const {
    children,
    defaultColorMode = DEFAULT_COLOR_MODE,
    isMobile = false,
    isDebugMode = false,
    queryOverrides,
    themeOverrides,
    semanticColorOverrides,
  } = props
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode)
  const tokenValue = useThemeStyle(colorMode, themeOverrides, semanticColorOverrides)

  const systemColorMode = useMediaQuery<ColorMode>("(prefers-color-scheme: dark)", defaultColorMode, "dark", "light")
  const conditions = useContextConditions(colorMode, isMobile, isDebugMode, queryOverrides)
  const isTouchDevice = conditions.touch

  const systemColorTimer = useRef<ReturnType<typeof setTimeout>>()

  const toggleColorMode = useCallback(
    () => setColorMode((mode: ColorMode) => (mode === "light" ? "dark" : "light")),
    []
  )

  // Change the color mode, when the user system's color mode changes
  useEffect(() => {
    systemColorTimer.current = setTimeout(() => {
      setColorMode(systemColorMode)
    }, 50)
    return () => systemColorTimer.current && clearTimeout(systemColorTimer.current)
  }, [systemColorMode])

  return (
    <QuarksContext.Provider
      value={{
        colorMode,
        isDark: colorMode === "dark",
        setColorMode,
        toggleColorMode,
        isTouchDevice,
        tokenValue,
      }}
    >
      <CssConditionsContext.Provider value={conditions}>{children}</CssConditionsContext.Provider>
    </QuarksContext.Provider>
  )
}
