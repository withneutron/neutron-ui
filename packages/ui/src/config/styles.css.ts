import { createGlobalTheme, createTheme, style, createGlobalThemeContract, globalStyle } from "@vanilla-extract/css"
import { CharHash } from "./utils"
import {
  getSize,
  getSpace,
  getRadius,
  getColumn,
  getRow,
  getZIndex,
  getLineHeight,
  getTypeSpace,
  getTextDecoration,
  getShadow,
  getFontSize,
  getFontWeight,
  getFontFamily,
  getFont,
  getColor,
  getBorder,
  getOutline,
  getAnimation,
} from "./scales"
import { CssRule, FilterKeys, generateInteractivePseudoClassCss, generateScaledPropsCss } from "./props"

// Export the theme
export const { exampleClass, themeClass } = generateStyles()

// Function that generates the styles
function generateStyles() {
  globalStyle("html, body", {
    margin: 0,
    padding: 0,
  })
  return {
    exampleClass: "",
    themeClass: "",
  }
}

///////
const varHash = new CharHash()
const keyframeHash = new CharHash()
const classHash = new CharHash()

// Generate theme scales
const animation = getAnimation(varHash, keyframeHash)
const color = getColor(varHash)
const size = getSize(varHash)
const space = getSpace(varHash, size.vars)
const radius = getRadius(varHash)
const column = getColumn(varHash, size.vars)
const row = getRow(varHash, column.vars)
const zIndex = getZIndex(varHash)
const lineHeight = getLineHeight(varHash, size.vars)
const typeSpace = getTypeSpace(varHash)
const textDecoration = getTextDecoration(varHash, color.vars)
const shadow = getShadow(varHash, color.vars)
const fontSize = getFontSize(varHash)
const fontWeight = getFontWeight(varHash)
const fontFamily = getFontFamily(varHash)
const font = getFont(varHash, fontSize.vars, fontWeight.vars, fontFamily.vars)
const border = getBorder(varHash, color.vars)
const outline = getOutline(varHash, color.vars)

const scales = {
  animation,
  border,
  color,
  column,
  font,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  outline,
  radius,
  row,
  shadow,
  size,
  space,
  textDecoration,
  typeSpace,
  zIndex,
} as const

// Generate CSS props that are based on scales
const scaledProps = generateScaledPropsCss(scales, (value: CssRule) => {
  const className = classHash.name
  globalStyle(`.${className}`, value)
  return className
})

// Generate CSS props that are _conditional_, and based on scales
const conditionalScaledProps = generateInteractivePseudoClassCss<typeof scaledProps>(
  (condition: string, keys: FilterKeys) =>
    generateScaledPropsCss(
      scales,
      (value: CssRule) => {
        const className = classHash.name
        globalStyle(`.${className}${condition}`, value)
        return className
      },
      keys
    )
)
