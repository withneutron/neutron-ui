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
  CssValueMap,
  CssValue,
  // Scales,
} from "./scales"
import { CssClassDef, CssValueRules, scaledProps } from "./props"
// import { getScaledProps } from "./props"

// Export the theme
export const { exampleClass, themeClass, vars } = generateStyles()

// Function that generates the styles
function generateStyles() {
  const space = {
    none: null,
    base: null,
    xs: null,
    s: null,
    m: null,
    l: null,
    xl: null,
  } as const

  const size = space

  const $theme = createGlobalThemeContract(
    {
      color: {
        brand: null,
      },
      font: {
        body: null,
      },
      size,
      space,
    },
    (_value, path) => `nui-${path.join("-")}`
  )

  createGlobalTheme(":root", $theme, {
    color: {
      brand: "blue",
    },
    font: {
      body: "arial",
    },
    size: {
      none: "0px",
      base: "4px",
      xs: $theme.space.base,
      s: "8px",
      m: "16px",
      l: "24px",
      xl: "36px",
    },
    space: {
      none: "0px",
      base: $theme.size.base,
      xs: $theme.space.base,
      s: "8px",
      m: "16px",
      l: "24px",
      xl: "36px",
    },
  })

  const [themeClass, vars] = createTheme(
    {
      color: {
        brand: "blue",
      },
      font: {
        body: "arial",
      },
      size: {
        none: "0px",
        base: "4px",
        xs: $theme.space.base,
        s: "8px",
        m: "16px",
        l: "24px",
        xl: "36px",
      },
      space: {
        none: "0px",
        base: $theme.size.base,
        xs: $theme.space.base,
        s: "8px",
        m: "16px",
        l: "24px",
        xl: "36px",
      },
    },
    "neutron-theme-light"
  )

  const exampleClass = style({
    backgroundColor: $theme.color.brand,
    fontFamily: $theme.font.body,
    color: "white",
    padding: 1,
  })

  globalStyle("html, body", {
    margin: $theme.space.none,
    padding: $theme.size.xs,
  })
  return { exampleClass, themeClass, vars }
}

///////
const varHash = new CharHash()
const keyframeHash = new CharHash()
const classHash = new CharHash()

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

Object.keys(scaledProps).forEach(prop => {
  Object.values(scaledProps[prop as keyof typeof scaledProps](scales, classHash)).forEach(classDef => {
    Object.entries(classDef).forEach(([className, cssRule]) => {
      globalStyle(`.${className}`, cssRule)
    })
  })
})

// console.log("color", color)
// console.log("size", size)
// console.log("space", space)
// console.log("radius", radius)
// console.log("column", column)
// console.log("row", row)
// console.log("zIndex", zIndex)
// console.log("lineHeight", lineHeight)
// console.log("typeSpace", typeSpace)
// console.log("textDecoration", textDecoration)
// console.log("shadow", shadow)
// console.log("fontSize", fontSize)
// console.log("fontWeight", fontWeight)
// console.log("fontFamily", fontFamily)
// console.log("font", font)
// console.log("border", border)
// console.log("outline", outline)
