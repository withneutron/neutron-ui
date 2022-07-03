import { createGlobalTheme, createTheme, style, createGlobalThemeContract, globalStyle } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { CharHash } from "./CharHash"
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

/////////////////
// Methodology //
/////////////////
/**
 * Create a utility class for every value in every condition.
 * Create a custom value class (and var) for each condition, using an emoji prefix (♾).
 * The resolver function would default to utility classes, unless the value is custom.
 * The resolver outputs both `className` and `style`, including merging with external values for those props.
 * The resolver accepts both direct styling props, and via the `css` prop.
 */

/////////////////
// This is a hacky way to get a union-friendly string that doesn't wipe out static string values from a union
type CssString = string & { trim?: () => string }
type Test = "a" | "b" | "c" | CssString

type TestObj = {
  test: Test
}

const test: TestObj = {
  test: "a",
}

const value: Test = ""

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

const { scale: color } = getColor(hash)
const { scale: size } = getSize(hash)
const { scale: space } = getSpace(hash, size)
const { scale: radius } = getRadius(hash)
const { scale: column } = getColumn(hash, size)
const { scale: row } = getRow(hash, column)
const { scale: zIndex } = getZIndex(hash)
const { scale: lineHeight } = getLineHeight(hash, size)
const { scale: typeSpace } = getTypeSpace(hash)
const { scale: textDecoration } = getTextDecoration(hash, color)
const { scale: shadow } = getShadow(hash, color)
const { scale: fontSize } = getFontSize(hash)
const { scale: fontWeight } = getFontWeight(hash)
const { scale: fontFamily } = getFontFamily(hash)
const { scale: font } = getFont(hash, fontSize, fontWeight, fontFamily)
const { scale: border } = getBorder(hash, color)
const { scale: outline } = getOutline(hash, color)

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
