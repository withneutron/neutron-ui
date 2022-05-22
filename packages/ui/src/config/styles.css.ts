import {
  createGlobalTheme,
  createTheme,
  style,
  createGlobalThemeContract,
  globalStyle,
} from "@vanilla-extract/css"

const space = {
  none: "0px",
  xs: "4px",
  s: "8px",
  m: "16px",
  l: "24px",
  xl: "36px",
} as const

const size = space

export const themeContract = createGlobalThemeContract(
  {
    color: {
      brand: null,
    },
    font: {
      body: null,
    },
    space: Object.keys(space).reduce((out: Record<keyof typeof space, null>, key: string) => {
      out[key as keyof typeof space] = null
      return out
    }, {} as Record<keyof typeof space, null>),
    size: Object.keys(size).reduce((out: Record<keyof typeof size, null>, key: string) => {
      out[key as keyof typeof size] = null
      return out
    }, {} as Record<keyof typeof size, null>),
  },
  (_value, path) => `nui-${path.join("-")}`
)

createGlobalTheme(":root", themeContract, {
  color: {
    brand: "blue",
  },
  font: {
    body: "arial",
  },
  space,
  size,
})

export const [themeClass, vars] = createTheme(
  {
    color: {
      brand: "blue",
    },
    font: {
      body: "arial",
    },
    space,
    size,
  },
  "neutron-theme-light"
)

export const exampleClass = style({
  backgroundColor: vars.color.brand,
  fontFamily: vars.font.body,
  color: "white",
  padding: 10,
})

globalStyle("html, body", {
  margin: vars.space.none,
  padding: vars.size.m,
})
