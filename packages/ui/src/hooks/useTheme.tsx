import { useContext } from "react"
import { baseTheme, baseDarkTheme, CompleteTheme } from "../config/stitches.config"
import { mergeThemes } from "../config/stitches.utils"
import { ThemeContext, ThemeContextProps } from "../providers/UIProvider"

interface UseTheme extends ThemeContextProps {
  activeTheme: CompleteTheme
  completeTheme: CompleteTheme
  completeDarkTheme: CompleteTheme
}

export function useTheme(): UseTheme {
  const { isDark, theme, darkTheme, ref } = useContext(ThemeContext)
  const completeDarkTheme = mergeThemes([baseTheme, baseDarkTheme, darkTheme]) as CompleteTheme
  const completeTheme = mergeThemes([baseTheme, theme]) as CompleteTheme
  const activeTheme = isDark ? completeDarkTheme : completeTheme

  return {
    isDark,
    ref,
    activeTheme,
    theme: theme ?? baseTheme,
    darkTheme: darkTheme ?? baseDarkTheme,
    completeTheme,
    completeDarkTheme,
  }
}
