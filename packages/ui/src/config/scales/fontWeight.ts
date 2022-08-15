import { addPrefix, CharHash } from "../utils"
import { ThemeScale } from "./scales.models"
import { getCssMapFromVars, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `fontWeight` theme scale */
export function getFontWeight(hash: CharHash) {
  const baseVars = {
    100: { ...hash.var, value: "100" },
    200: { ...hash.var, value: "200" },
    300: { ...hash.var, value: "300" },
    400: { ...hash.var, value: "400" },
    500: { ...hash.var, value: "500" },
    600: { ...hash.var, value: "600" },
    700: { ...hash.var, value: "700" },
    800: { ...hash.var, value: "800" },
    900: { ...hash.var, value: "900" },
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
  const cssValueMap = {
    ...getCssMapFromVars(sharedVars),
    thin: "thin",
    extraLight: "extraLight",
    light: "light",
    regular: "regular",
    medium: "medium",
    semiBold: "semiBold",
    bold: "bold",
    extraBold: "extraBold",
    black: "black",
  } as const
  const cssAliasMap = {
    [addPrefix("thin")]: { var: baseVars[100].ref, target: addPrefix("100") },
    [addPrefix("extraLight")]: { var: baseVars[200].ref, target: addPrefix("200") },
    [addPrefix("light")]: { var: baseVars[300].ref, target: addPrefix("300") },
    [addPrefix("regular")]: { var: baseVars[400].ref, target: addPrefix("400") },
    [addPrefix("medium")]: { var: baseVars[500].ref, target: addPrefix("500") },
    [addPrefix("semiBold")]: { var: baseVars[600].ref, target: addPrefix("600") },
    [addPrefix("bold")]: { var: baseVars[700].ref, target: addPrefix("700") },
    [addPrefix("extraBold")]: { var: baseVars[800].ref, target: addPrefix("800") },
    [addPrefix("black")]: { var: baseVars[900].ref, target: addPrefix("900") },
  } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap), ...getThemePropsFromCssMap(cssAliasMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssAliasMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap, typeof cssAliasMap>
}
