import { CharHash } from "../CharHash"
import { ThemeScale } from "./models"
import { getCssMapFromVars, getThemePropsFromCssMap } from "./utils"

/** Generator function for `radius` theme scale */
export function getRadius(hash: CharHash) {
  const base = { ...hash.var, value: "4rem" } as const
  const field = { ...hash.var, value: base.ref } as const
  const rounded = { ...hash.var, value: `min(max(${field.ref}, 4rem), 4rem)` } as const

  const sharedVars = {
    0: { ...hash.var, value: "0" },
    1: { ...hash.var, value: "1rem" },
    2: { ...hash.var, value: `calc(${base.ref} * 0.5)` },
    3: { ...hash.var, value: `calc(${base.ref} * 0.75)` },
    4: { ...hash.var, value: base.ref },
    6: { ...hash.var, value: `calc(${base.ref} * 1.5)` },
    8: { ...hash.var, value: `calc(${base.ref} * 2)` },
    10: { ...hash.var, value: `calc(${base.ref} * 2.5)` },
    12: { ...hash.var, value: `calc(${base.ref} * 3)` },
    40: { ...hash.var, value: `calc(${base.ref} * 10)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
    // Shapes
    rectangular: { ...hash.var, value: "0" },
    round: { ...hash.var, value: "50%" },
    pill: { ...hash.var, value: "400rem" },
    rounded,
    // Component
    field,
    button: { ...hash.var, value: field.ref },
    tooltip: { ...hash.var, value: rounded.ref },
  } as const

  const vars = { ...sharedVars, base } as const
  const cssValueMap = { ...getCssMapFromVars(sharedVars) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
