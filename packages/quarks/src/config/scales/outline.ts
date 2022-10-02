import { CharHash } from "../utils"
import { ColorVars, ThemeScale } from "./scales.models"
import { getCssMapFromVars, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `outline` theme scale */
export function getOutline<T extends ColorVars>(hash: CharHash, color: T) {
  const widthBase = { ...hash.var, value: "2rem" } as const
  const widthMin = { ...hash.var, value: `calc(${widthBase.ref} - 1rem)` } as const
  const widthMax = { ...hash.var, value: `calc(${widthBase.ref} + 2rem)` } as const
  const primaryColorBase = { ...hash.var, value: color.primary8.ref } as const
  const primaryColorMin = { ...hash.var, value: color.primary6.ref } as const
  const primaryColorMax = { ...hash.var, value: color.primary9.ref } as const
  const secondaryColorBase = { ...hash.var, value: color.secondary8.ref } as const
  const secondaryColorMin = { ...hash.var, value: color.secondary6.ref } as const
  const secondaryColorMax = { ...hash.var, value: color.secondary9.ref } as const
  const tertiaryColorBase = { ...hash.var, value: color.tertiary7.ref } as const
  const tertiaryColorMin = { ...hash.var, value: color.tertiary4.ref } as const
  const tertiaryColorMax = { ...hash.var, value: color.tertiary9.ref } as const
  const offsetBase = { ...hash.var, value: widthBase.ref } as const
  const offsetMin = { ...hash.var, value: `max(0, calc(${offsetBase.ref}) - 2rem)` } as const
  const offsetMax = { ...hash.var, value: `calc(${offsetBase.ref} + 2rem)` } as const

  const defaultWidth = { ...hash.var, value: widthBase.ref } as const
  const defaultStyle = { ...hash.var, value: "solid" } as const
  const defaultOffset = { ...hash.var, value: offsetBase.ref } as const

  const sharedVars = {
    widthBase,
    widthMin,
    widthMax,
    primaryColorBase,
    primaryColorMin,
    primaryColorMax,
    secondaryColorBase,
    secondaryColorMin,
    secondaryColorMax,
    tertiaryColorBase,
    tertiaryColorMin,
    tertiaryColorMax,
    offsetBase,
    offsetMin,
    offsetMax,
    // Defaults are not added here, because they are just internal reference vars;
    // they can only be consumed via the composite combos.
  } as const

  const vars = {
    ...sharedVars,
    defaultWidth,
    defaultStyle,
    defaultOffset,
    defaultOffsetMin: { ...hash.var, value: defaultOffset.ref },
    defaultOffsetMax: { ...hash.var, value: defaultOffset.ref },
    // Composition combos, for var generation
    primary: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${primaryColorBase.ref}` },
    primaryMin: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${primaryColorMin.ref}` },
    primaryMax: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${primaryColorMax.ref}` },
    secondary: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${secondaryColorBase.ref}` },
    secondaryMin: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${secondaryColorMin.ref}` },
    secondaryMax: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${secondaryColorMax.ref}` },
    tertiary: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${tertiaryColorBase.ref}` },
    tertiaryMin: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${tertiaryColorMin.ref}` },
    tertiaryMax: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${tertiaryColorMax.ref}` },
  } as const

  // These keys will get mapped into classes with multiple CSS properties
  const cssValueMap = {
    ...getCssMapFromVars(sharedVars),
    // Composition combos, for class generation
    primary: { outline: vars.primary.ref, outlineOffset: vars.defaultOffset.ref },
    primaryMin: { outline: vars.primaryMin.ref, outlineOffset: vars.defaultOffsetMin.ref },
    primaryMax: { outline: vars.primaryMax.ref, outlineOffset: vars.defaultOffsetMax.ref },
    secondary: { outline: vars.secondary.ref, outlineOffset: vars.defaultOffset.ref },
    secondaryMin: { outline: vars.secondaryMin.ref, outlineOffset: vars.defaultOffsetMin.ref },
    secondaryMax: { outline: vars.secondaryMax.ref, outlineOffset: vars.defaultOffsetMax.ref },
    tertiary: { outline: vars.tertiary.ref, outlineOffset: vars.defaultOffset.ref },
    tertiaryMin: { outline: vars.tertiaryMin.ref, outlineOffset: vars.defaultOffsetMin.ref },
    tertiaryMax: { outline: vars.tertiaryMax.ref, outlineOffset: vars.defaultOffsetMax.ref },
  } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}

export const outlineWidths = {
  widthBase: true,
  widthMin: true,
  widthMax: true,
  defaultWidth: true,
} as const

export const outlineColors = {
  primaryColorBase: true,
  primaryColorMin: true,
  primaryColorMax: true,
  secondaryColorBase: true,
  secondaryColorMin: true,
  secondaryColorMax: true,
  tertiaryColorBase: true,
  tertiaryColorMin: true,
  tertiaryColorMax: true,
} as const

export const outlineOffsets = {
  offsetBase: true,
  offsetMin: true,
  offsetMax: true,
  defaultOffset: true,
  defaultOffsetMin: true,
  defaultOffsetMax: true,
} as const

export const outlineCombos = {
  primary: true,
  primaryMin: true,
  primaryMax: true,
  secondary: true,
  secondaryMin: true,
  secondaryMax: true,
  tertiary: true,
  tertiaryMin: true,
  tertiaryMax: true,
} as const
