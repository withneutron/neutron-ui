import { CharHash } from "../CharHash"
import { ThemeScale } from "./models"
import { getCssMapFromVars, getPropsFromAliasMap, getThemePropsFromCssMap } from "./utils"

/** Generator function for `fontWeight` theme scale */
export function getFontWeight(hash: CharHash) {
  const baseVars = {
    "100": { ...hash.var, value: "100" },
    "200": { ...hash.var, value: "200" },
    "300": { ...hash.var, value: "300" },
    "400": { ...hash.var, value: "400" },
    "500": { ...hash.var, value: "500" },
    "600": { ...hash.var, value: "600" },
    "700": { ...hash.var, value: "700" },
    "800": { ...hash.var, value: "800" },
    "900": { ...hash.var, value: "900" },
  } as const

  const p = { ...hash.var, value: baseVars[300].ref } as const

  const sharedVars = {
    ...baseVars,
    h1: { ...hash.var, value: baseVars[600].ref },
    h2: { ...hash.var, value: baseVars[700].ref },
    h3: { ...hash.var, value: baseVars[600].ref },
    h4: { ...hash.var, value: baseVars[900].ref },
    h5: { ...hash.var, value: baseVars[600].ref },
    h6: { ...hash.var, value: baseVars[800].ref },
    p,
    a: { ...hash.var, value: p.ref },
    code: { ...hash.var, value: baseVars[600].ref },
    quote: { ...hash.var, value: baseVars[300].ref },
  } as const

  const vars = sharedVars
  const cssValueMap = { ...getCssMapFromVars(sharedVars) } as const
  const cssAliasMap = {
    thin: "100",
    extraLight: "200",
    light: "300",
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
    extraBold: "800",
    black: "900",
  } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap), ...getPropsFromAliasMap(cssAliasMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssAliasMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap, typeof cssAliasMap>
}
