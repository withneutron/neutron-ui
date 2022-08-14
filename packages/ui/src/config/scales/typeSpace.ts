import { CharHash } from "../utils"
import { ThemeScale } from "./scales.models"
import { getCssMapFromVars, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `typeSpace` theme scale */
export function getTypeSpace(hash: CharHash) {
  const emBase = { ...hash.var, value: "0em" } as const
  const remBase = { ...hash.var, value: "0rem" } as const
  const chBase = { ...hash.var, value: "0ch" } as const

  const sharedVars = {
    emBase,
    emMin: { ...hash.var, value: `calc(${emBase.ref} - 0.125em)` },
    emMax: { ...hash.var, value: `calc(${emBase.ref} + 0.125em)` },
    remBase,
    remMin: { ...hash.var, value: `calc(${remBase.ref} - 2rem)` },
    remMax: { ...hash.var, value: `calc(${remBase.ref} + 2rem)` },
    chBase,
    chMin: { ...hash.var, value: `calc(${chBase.ref} - 0.2ch)` },
    chMax: { ...hash.var, value: `calc(${chBase.ref} + 0.2ch)` },
    tightest: { ...hash.var, value: `calc(${remBase.ref} - 1rem)` },
    tight: { ...hash.var, value: `calc(${remBase.ref} - 0.25rem)` },
    regular: { ...hash.var, value: remBase.ref },
    loose: { ...hash.var, value: `calc(${remBase.ref} + 0.5rem)` },
  } as const

  const vars = sharedVars
  const cssValueMap = { ...getCssMapFromVars(sharedVars) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
