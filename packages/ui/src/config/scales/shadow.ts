import { CharHash } from "../CharHash"
import { ColorVars, ThemeScale } from "./models"
import { getCssMapFromVars, getThemePropsFromCssMap } from "./utils"

/** Generator function for `shadow` theme scale */
export function getShadow<T extends ColorVars>(hash: CharHash, color: T) {
  // LIGHT MODE SHADOWS
  const low = { ...hash.var, value: `0px 1px 1.5px hsl(${color.shadowBase.ref} / 0.18)` } as const
  const medium = {
    ...hash.var,
    value: `0px 1.8px 2.7px hsl(${color.shadowBase.ref} / 0.08),
0px 5.1px 7.7px hsl(${color.shadowBase.ref} / 0.16)`,
  } as const
  const high = {
    ...hash.var,
    value: `0px 3.7px 5.6px hsl(${color.shadowBase.ref} / 0.03),
0px 8px 12px hsl(${color.shadowBase.ref} / 0.05),
0px 17px 25.5px hsl(${color.shadowBase.ref} / 0.12)`,
  } as const
  const highSoft = {
    ...hash.var,
    value: `0px 3.7px 5.6px hsl(${color.shadowBase.ref} / 0.01),
0px 8px 12px hsl(${color.shadowBase.ref} / 0.02),
0px 17px 25.5px hsl(${color.shadowBase.ref} / 0.04)`,
  } as const

  const vars = {
    low,
    medium,
    high,
    highSoft,
  } as const
  const darkVars = {
    low: { ...low, value: `0px 1.5px 2.3px hsl(${color.shadowBase.ref} / 0.38)` },
    medium: {
      ...medium,
      value: `0px 2.6px 3.9px hsl(${color.shadowBase.ref} / 0.25),
0px 7.5px 11.3px hsl(${color.shadowBase.ref} / 0.40)`,
    },
    high: {
      ...high,
      value: `0px 8.6px 12.9px hsl(${color.shadowBase.ref} / 0.22),
    0px 19.1px 28.7px hsl(${color.shadowBase.ref} / 0.35),
    0px 40.8px 61.2px hsl(${color.shadowBase.ref} / 0.55)`,
    },
    highSoft: {
      ...highSoft,
      value: `0px 8.6px 12.9px hsl(${color.shadowBase.ref} / 0.18),
    0px 19.1px 28.7px hsl(${color.shadowBase.ref} / 0.30),
    0px 40.8px 61.2px hsl(${color.shadowBase.ref} / 0.44)`,
    },
  } as const
  const cssValueMap = { ...getCssMapFromVars(vars) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    darkVars,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
