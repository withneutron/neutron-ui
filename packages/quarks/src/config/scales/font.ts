import { CharHash } from "../utils"
import { FontFamily, FontSize, FontWeight, ThemeScale } from "./scales.models"
import { getCssMapFromVars, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `font` theme scale */
export function getFont<S extends FontSize, W extends FontWeight, F extends FontFamily>(
  hash: CharHash,
  fontSize: S,
  fontWeight: W,
  fontFamily: F
) {
  const baseVars = {
    h1: { ...hash.var, value: `${fontSize.h1.ref} ${fontWeight.h1.ref} ${fontFamily.heading.ref}` },
    h2: { ...hash.var, value: `${fontSize.h2.ref} ${fontWeight.h2.ref} ${fontFamily.heading.ref}` },
    h3: { ...hash.var, value: `${fontSize.h3.ref} ${fontWeight.h3.ref} ${fontFamily.heading.ref}` },
    h4: { ...hash.var, value: `${fontSize.h4.ref} ${fontWeight.h4.ref} ${fontFamily.heading.ref}` },
    h5: { ...hash.var, value: `${fontSize.h5.ref} ${fontWeight.h5.ref} ${fontFamily.heading.ref}` },
    h6: { ...hash.var, value: `${fontSize.h6.ref} ${fontWeight.h6.ref} ${fontFamily.heading.ref}` },
    body: { ...hash.var, value: `${fontSize.p.ref} ${fontWeight.p.ref} ${fontFamily.body.ref}` },
    code: { ...hash.var, value: `${fontSize.code.ref} ${fontWeight.code.ref} ${fontFamily.code.ref}` },
    quote: { ...hash.var, value: `italic ${fontSize.quote.ref} ${fontWeight.quote.ref} ${fontFamily.quote.ref}` },
  } as const

  const sharedVars = {
    ...baseVars,
    // Elements
    li: { ...hash.var, value: baseVars.body.ref },
    small: { ...hash.var, value: `${fontSize[14].ref} ${fontWeight.p.ref} ${fontFamily.body.ref}` },
    em: { ...hash.var, value: `italic ${fontSize.p.ref} ${fontWeight.p.ref} ${fontFamily.body.ref}` },
    strong: { ...hash.var, value: `${fontSize.p.ref} ${fontWeight[700].ref} ${fontFamily.body.ref}` },
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
