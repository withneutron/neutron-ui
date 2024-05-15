import { useContext } from "react"
import { baseTheme } from "../config/stitches.config"
import { UIContext, UIContextProps } from "../providers/UIProvider"
import { useTheme } from "./useTheme"

interface UseColors extends Pick<UIContextProps, "colorMode" | "setColorMode" | "toggleColorMode"> {
  colors: Partial<typeof baseTheme.colors>
  isDark: boolean
}

export function useColors(): UseColors {
  const { colorMode, setColorMode, toggleColorMode, isDark } = useContext(UIContext)
  const { activeTheme } = useTheme()
  return {
    colorMode,
    colors: activeTheme.colors,
    isDark,
    setColorMode,
    toggleColorMode,
  }
}
