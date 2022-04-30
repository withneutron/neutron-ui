import {
  globalCss,
  theme,
  darkTheme,
  getThemeFonts,
  getButton,
  getIconButton,
} from "@withneutron/ui"
import {
  customDarkTheme,
  customTheme,
  fontLinks,
  customThemeValues,
  customDarkThemeValues,
  customButtonStyles,
  customIconButtonStyles,
} from "./gadget.theme"
export * from "@withneutron/ui"
// import {
//   customDarkTheme,
//   customTheme,
//   fontLinks,
//   customThemeValues,
//   customDarkThemeValues,
//   customButtonStyles,
//   customIconButtonStyles
// } from "./earthy.theme"

// CUSTOM APP THEME //
export const useDefaultTheme = false
export const simulateRTL = false

// Export app theme
export const appTheme = useDefaultTheme ? theme : customTheme
export const appDarkTheme = useDefaultTheme ? darkTheme : customDarkTheme
export const appFontLinks = useDefaultTheme ? getThemeFonts().links : fontLinks
export const dynamicThemeValues = useDefaultTheme ? undefined : customThemeValues
export const dynamicDarkThemeValues = useDefaultTheme ? undefined : customDarkThemeValues

// GLOBAL STYLES //
export const appGlobalStyles = globalCss({})

// CUSTOM COMPONENTS //
export const Button = getButton(useDefaultTheme ? {} : customButtonStyles, "Button")
export const IconButton = getIconButton(useDefaultTheme ? {} : customIconButtonStyles, "IconButton")
