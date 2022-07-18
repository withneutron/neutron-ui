import { CharHash } from "../CharHash"
import { BaseVars, ThemeScale } from "./models"
import { getCssMapFromVars, getThemePropsFromCssMap } from "./utils"

/** Generator function for `lineHeight` theme scale */
export function getLineHeight<T extends BaseVars>(hash: CharHash, size: T) {
  const base = { ...hash.var, value: "1.65" } as const
  const modifier = { ...hash.var, value: "0" } as const
  const lh20 = { ...hash.var, value: `calc(${size[20].ref} + ${modifier.ref})` } as const
  const field = { ...hash.var, value: lh20.ref } as const

  const sharedVars = {
    4: { ...hash.var, value: `calc(${size[4].ref} + ${modifier.ref})` },
    8: { ...hash.var, value: `calc(${size[8].ref} + ${modifier.ref})` },
    12: { ...hash.var, value: `calc(${size[12].ref} + ${modifier.ref})` },
    16: { ...hash.var, value: `calc(${size[16].ref} + ${modifier.ref})` },
    20: lh20,
    24: { ...hash.var, value: `calc(${size[24].ref} + ${modifier.ref})` },
    32: { ...hash.var, value: `calc(${size[32].ref} + ${modifier.ref})` },
    40: { ...hash.var, value: `calc(${size[40].ref} + ${modifier.ref})` },
    min: { ...hash.var, value: "1px" },
    spaced: { ...hash.var, value: `calc((${base.ref}) * 1.1) + ${modifier.ref}))` },
    tight: { ...hash.var, value: `calc((${base.ref}) / 1.65) + ${modifier.ref}))` },
    // Semantic
    body: { ...hash.var, value: `calc(${base.ref}) + ${modifier.ref}))` },
    heading: { ...hash.var, value: `calc((0.75 + (${base.ref}) * 0.3)) + ${modifier.ref}))` },
    listItem: { ...hash.var, value: `calc((0.75 + (${base.ref}) * 0.3)) + ${modifier.ref}))` },
    // Components
    field,
    label: { ...hash.var, value: field.ref },
    button: { ...hash.var, value: "2rem" },
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
