import {
  createTheme,
  generateThemeColors,
  SemanticColors,
  saturate,
  getThemeFonts,
} from "@withneutron/ui"

const { fonts, links } = getThemeFonts({
  body: "inter",
  button: "inter",
  heading: "playfairDisplay",
})
export const fontLinks = links

const CUSTOM_STYLES = {
  fontSizes: { base: "17rem" },
  fonts,
  radii: { button: "$pill" }, //, field: "$pill" }, //, base: "0rem" },
  borderWidths: { base: "1rem" },
  sizes: {
    buttonBasePx: "$5",
    buttonBasePy: "calc($2 + $1)",
    tooltipBaseP: "$5",
  },
  // space: { base: "6rem" },
}
const customPalette: SemanticColors = {
  primary: "hsl(46.12,100%,50%)",
  secondary: "hsl(180,100%,46.67%)",
  neutral: saturate("hsl(46.12,100%,50%)", 0.4),
}
export const customThemeValues = {
  ...CUSTOM_STYLES,
  colors: {
    ...generateThemeColors(customPalette, "light"),
    defaultBody: "$textSecondary1",
    defaultHeading: "$textSecondary1",
  },
}
export const customTheme = createTheme("custom-theme", customThemeValues)
export const customDarkThemeValues = {
  ...CUSTOM_STYLES,
  colors: {
    ...generateThemeColors(customPalette, "dark"),
    defaultBody: "$textNeutral1",
    defaultHeading: "$textNeutral1",
  },
}
export const customDarkTheme = createTheme("custom-dark-theme", customDarkThemeValues)

export const themeFonts = ["playfairDisplay", "inter", "firaCode"]
