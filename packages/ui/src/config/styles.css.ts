import { createGlobalTheme, createTheme, style, createGlobalThemeContract, globalStyle } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
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
} from "./scales"

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
      s: calc.multiply($theme.space.base, 2),
      m: calc.multiply($theme.space.base, 4), // "16px"
      l: calc.multiply($theme.space.base, 6), // "24px"
      xl: calc.multiply($theme.space.base, 9), // "36px"
    },
    space: {
      none: "0px",
      base: $theme.size.base,
      xs: $theme.space.base,
      s: calc.multiply($theme.space.base, 2),
      m: calc.multiply($theme.space.base, 4), // "16px"
      l: calc.multiply($theme.space.base, 6), // "24px"
      xl: calc.multiply($theme.space.base, 9), // "36px"
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
        s: calc.multiply($theme.space.base, 2),
        m: calc.multiply($theme.space.base, 4), // "16px"
        l: calc.multiply($theme.space.base, 6), // "24px"
        xl: calc.multiply($theme.space.base, 9), // "36px"
      },
      space: {
        none: "0px",
        base: $theme.size.base,
        xs: $theme.space.base,
        s: calc.multiply($theme.space.base, 2),
        m: calc.multiply($theme.space.base, 4), // "16px"
        l: calc.multiply($theme.space.base, 6), // "24px"
        xl: calc.multiply($theme.space.base, 9), // "36px"
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
const hash = new CharHash()

const { vars: color } = getColor(hash)
const { vars: size } = getSize(hash)
const { vars: space } = getSpace(hash, size)
const { vars: radius } = getRadius(hash)
const { vars: column } = getColumn(hash, size)
const { vars: row } = getRow(hash, column)
const { vars: zIndex } = getZIndex(hash)
const { vars: lineHeight } = getLineHeight(hash, size)
const { vars: typeSpace } = getTypeSpace(hash)
const { vars: textDecoration } = getTextDecoration(hash, color)
const { vars: shadow } = getShadow(hash, color)
const { vars: fontSize } = getFontSize(hash)
const { vars: fontWeight } = getFontWeight(hash)
const { vars: fontFamily } = getFontFamily(hash)
const { vars: font } = getFont(hash, fontSize, fontWeight, fontFamily)
const { vars: border } = getBorder(hash, color)
const { vars: outline } = getOutline(hash, color)

console.log("color", color)
console.log("size", size)
console.log("space", space)
console.log("radius", radius)
console.log("column", column)
console.log("row", row)
console.log("zIndex", zIndex)
console.log("lineHeight", lineHeight)
console.log("typeSpace", typeSpace)
console.log("textDecoration", textDecoration)
console.log("shadow", shadow)
console.log("fontSize", fontSize)
console.log("fontWeight", fontWeight)
console.log("fontFamily", fontFamily)
console.log("font", font)
console.log("border", border)
console.log("outline", outline)
