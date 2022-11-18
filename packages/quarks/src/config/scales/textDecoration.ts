import { CharHash } from "../utils"
import { ColorVars, ThemeScale } from "./scales.models"
import { getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `textDecoration` theme scale */
export function getTextDecoration<T extends ColorVars>(hash: CharHash, color: T) {
  const underlineStyle = { ...hash.var, value: "solid" } as const
  const underlineThickness = { ...hash.var, value: "auto" } as const

  const strikeStyle = { ...hash.var, value: "solid" } as const
  const strikeThickness = { ...hash.var, value: "auto" } as const

  const altType = { ...hash.var, value: "overline" } as const
  const altStyle = { ...hash.var, value: "solid" } as const
  const altThickness = { ...hash.var, value: "auto" } as const

  const highlightType = { ...hash.var, value: "underline" } as const
  const highlightStyle = { ...hash.var, value: "wavy" } as const
  const highlightThickness = { ...hash.var, value: "1.5rem" } as const

  const defaultColor = { ...hash.var, value: "currentColor" } as const
  const primaryColor = { ...hash.var, value: color.primary9.ref } as const
  const secondaryColor = { ...hash.var, value: color.secondary9.ref } as const
  const infoColor = { ...hash.var, value: color.info9.ref } as const
  const successColor = { ...hash.var, value: color.success9.ref } as const
  const warningColor = { ...hash.var, value: color.warning9.ref } as const
  const errorColor = { ...hash.var, value: color.error9.ref } as const

  const vars = {
    underlineStyle,
    underlineThickness,
    strikeStyle,
    strikeThickness,
    altType,
    altStyle,
    altThickness,
    highlightType,
    highlightStyle,
    highlightThickness,
    defaultColor,
    primaryColor,
    secondaryColor,
    infoColor,
    successColor,
    warningColor,
    errorColor,
  } as const

  const cssValueMap = {
    underlineDefault: `underline ${underlineStyle.ref} ${defaultColor.ref} ${underlineThickness.ref}`,
    underlinePrimary: `underline ${underlineStyle.ref} ${primaryColor.ref} ${underlineThickness.ref}`,
    underlineSecondary: `underline ${underlineStyle.ref} ${secondaryColor.ref} ${underlineThickness.ref}`,
    strikeDefault: `line-through ${strikeStyle.ref} ${defaultColor.ref} ${strikeThickness.ref}`,
    strikePrimary: `line-through ${strikeStyle.ref} ${primaryColor.ref} ${strikeThickness.ref}`,
    strikeSecondary: `line-through ${strikeStyle.ref} ${secondaryColor.ref} ${strikeThickness.ref}`,
    altDefault: `${altType.ref} ${altStyle.ref} ${defaultColor.ref} ${altThickness.ref}`,
    altPrimary: `${altType.ref} ${altStyle.ref} ${primaryColor.ref} ${altThickness.ref}`,
    altSecondary: `${altType.ref} ${altStyle.ref} ${secondaryColor.ref} ${altThickness.ref}`,
    highlightPrimary: `${highlightType.ref} ${highlightStyle.ref} ${primaryColor.ref} ${highlightThickness.ref}`,
    highlightSecondary: `${highlightType.ref} ${highlightStyle.ref} ${secondaryColor.ref} ${highlightThickness.ref}`,
    highlightInfo: `${highlightType.ref} ${highlightStyle.ref} ${infoColor.ref} ${highlightThickness.ref}`,
    highlightSuccess: `${highlightType.ref} ${highlightStyle.ref} ${successColor.ref} ${highlightThickness.ref}`,
    highlightWarning: `${highlightType.ref} ${highlightStyle.ref} ${warningColor.ref} ${highlightThickness.ref}`,
    highlightError: `${highlightType.ref} ${highlightStyle.ref} ${errorColor.ref} ${highlightThickness.ref}`,
  } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
