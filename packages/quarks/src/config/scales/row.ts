import { CharHash } from "../utils"
import { BaseVars, ThemeScale } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `row` theme scale */
export function getRow<T extends BaseVars>(hash: CharHash, column: T) {
  const r40 = { ...hash.var, value: column[40].ref } as const
  const r80 = { ...hash.var, value: column[80].ref } as const
  const r120 = { ...hash.var, value: column[120].ref } as const
  const r200 = { ...hash.var, value: column[200].ref } as const
  const r320 = { ...hash.var, value: column[320].ref } as const

  const sharedVars = {
    40: r40,
    80: r80,
    120: r120,
    200: r200,
    320: r320,
  } as const

  const vars = sharedVars
  const cssValueMap = { ...getCssMapFromVars(sharedVars) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
