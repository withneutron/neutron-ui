import type { SemanticColors } from "@withneutron/ui"
import { createTheme, generateThemeColors, getThemeFonts } from "@withneutron/ui"

const { fonts, links } = getThemeFonts({
  body: "openSans",
  button: "inconsolata",
  heading: "inconsolata",
  code: "inconsolata",
})
export const fontLinks = links

const CUSTOM_STYLES = {
  // borderStyles: {
  //   focusRing: "dashed",
  // },
  // borderWidths: {
  //   focusRing: "$base",
  //   base: "1rem",
  // },
  fontSizes: {
    base: "16rem",
    h1: "$10",
    h2: "$8",
    h3: "$7",
    h4: "$6",
    h5: "$5",
    h6: "$4",
    button: "calc($3 * 1.075)",
    field: "$2",
  },
  fonts,
  sizes: {
    // buttonBasePx: "$5",
    buttonBasePy: "$2",
    tooltipBaseP: "$3",
  },
  lineHeights: { modifier: "1rem" },
  radii: {
    // base: "0rem",
  },
  // space: { base: "2rem" },
}

const customPalette: SemanticColors = {
  neutral: "hsl(60,6.67%,94.12%)",
  primary: "hsl(240,100%,54.31%)",
  secondary: "hsl(90.93,100%,44.12%)",
}
const customDarkPalette: SemanticColors = {
  neutral: "hsl(60,6.67%,94.12%)",
  primary: "hsl(240,100%,54.31%)",
  secondary: "hsl(90.93,100%,44.12%)",
  // primary: "hsl(90.93,100%,44.12%)",
  // secondary: "hsl(240,100%,54.31%)",
}
export const customThemeValues = {
  ...CUSTOM_STYLES,
  colors: {
    ...generateThemeColors(customPalette, "light", true),
    defaultHeading: "$neutralMax",
  },
}
export const customTheme = createTheme("custom-theme", customThemeValues)
export const customDarkThemeValues = {
  ...CUSTOM_STYLES,
  colors: {
    ...generateThemeColors(customDarkPalette, "dark", true),
    defaultHeading: "$neutralMax",
  },
}
export const customDarkTheme = createTheme("custom-dark-theme", customDarkThemeValues)

export const customButtonStyles = {
  defaultVariants: { variant: "tactile" },
}
export const customIconButtonStyles = customButtonStyles
