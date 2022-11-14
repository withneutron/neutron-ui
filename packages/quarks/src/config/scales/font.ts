import { CharHash } from "../utils"
import { FontFamily, FontSize, FontWeight, ThemeScale } from "./scales.models"
import { getCssMapFromVars, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `font` theme scale */
export function getFont<S extends FontSize, W extends FontWeight, F extends FontFamily>(
  hash: CharHash,
  fontWeight: W,
  fontSize: S,
  fontFamily: F
) {
  const baseVars = {
    h1: { ...hash.var, value: `${fontWeight.h1.ref} ${fontSize.h1.ref} ${fontFamily.heading.ref}` },
    h2: { ...hash.var, value: `${fontWeight.h2.ref} ${fontSize.h2.ref} ${fontFamily.heading.ref}` },
    h3: { ...hash.var, value: `${fontWeight.h3.ref} ${fontSize.h3.ref} ${fontFamily.heading.ref}` },
    h4: { ...hash.var, value: `${fontWeight.h4.ref} ${fontSize.h4.ref} ${fontFamily.heading.ref}` },
    h5: { ...hash.var, value: `${fontWeight.h5.ref} ${fontSize.h5.ref} ${fontFamily.heading.ref}` },
    h6: { ...hash.var, value: `${fontWeight.h6.ref} ${fontSize.h6.ref} ${fontFamily.heading.ref}` },
    body: { ...hash.var, value: `${fontWeight.p.ref} ${fontSize.p.ref} ${fontFamily.body.ref}` },
    code: { ...hash.var, value: `${fontWeight.code.ref} ${fontSize.code.ref} ${fontFamily.code.ref}` },
    quote: { ...hash.var, value: `italic ${fontWeight.quote.ref} ${fontSize.quote.ref} ${fontFamily.quote.ref}` },
  } as const

  const sharedVars = {
    ...baseVars,
    // Elements
    li: { ...hash.var, value: baseVars.body.ref },
    small: { ...hash.var, value: `${fontWeight.p.ref} ${fontSize[14].ref} ${fontFamily.body.ref}` },
    em: { ...hash.var, value: `italic ${fontWeight.p.ref} ${fontSize.p.ref} ${fontFamily.body.ref}` },
    strong: { ...hash.var, value: `${fontWeight[700].ref} ${fontSize.p.ref} ${fontFamily.body.ref}` },
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
