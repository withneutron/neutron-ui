import {
  createGlobalTheme,
  createTheme,
  style,
  createGlobalThemeContract,
  globalStyle,
} from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"

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

export const $theme = createGlobalThemeContract(
  {
    color: {
      brand: null,
    },
    font: {
      body: null,
    },
    space,
    size,
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
  space: {
    none: "0px",
    base: "4px",
    xs: $theme.space.base,
    s: calc.multiply($theme.space.base, 2),
    m: calc.multiply($theme.space.base, 4), // "16px"
    l: calc.multiply($theme.space.base, 6), // "24px"
    xl: calc.multiply($theme.space.base, 9), // "36px"
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
})

export const [themeClass, vars] = createTheme(
  {
    color: {
      brand: "blue",
    },
    font: {
      body: "arial",
    },
    space: {
      none: "0px",
      base: "4px",
      xs: $theme.space.base,
      s: calc.multiply($theme.space.base, 2),
      m: calc.multiply($theme.space.base, 4), // "16px"
      l: calc.multiply($theme.space.base, 6), // "24px"
      xl: calc.multiply($theme.space.base, 9), // "36px"
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
  },
  "neutron-theme-light"
)

export const exampleClass = style({
  backgroundColor: $theme.color.brand,
  fontFamily: $theme.font.body,
  color: "white",
  padding: 10,
})

globalStyle("html, body", {
  margin: $theme.space.none,
  padding: $theme.size.m,
})
