import {
  capitalizeFirstLetter,
  enumKeys,
  enumValues,
  generatePaletteFromHue,
  getAlphaColorAtIndex,
  getAlphaColors,
  getChromaObject,
  getColorRange,
} from "../shared/utils"
import {
  AlphaColorName,
  BodyFontFamily,
  ChromaColor,
  CodeFontFamily,
  ColorGenOptions,
  ColorKeys,
  ColorMode,
  ColorNumberKey,
  DARK_INFO_STATUS_TEXT_COLOR_TARGETS,
  DARK_LUMINANCE_VALUES,
  DARK_STATUS_INFO_COLOR_POINTERS,
  DARK_STATUS_INVERTED_LUMINANCE_VALUES,
  DARK_STATUS_LUMINANCE_VALUES,
  DARK_STATUS_TEXT_LUMINANCE,
  DARK_STATUS_TEXT_MAX_LUMINANCE,
  DEFAULT_SOURCE_COLORS,
  FG_COLOR_INDEX,
  FlavorColorName,
  FontFamilySpec,
  HeadingFontFamily,
  LIGHT_INFO_STATUS_TEXT_COLOR_TARGETS,
  LIGHT_LUMINANCE_VALUES,
  LIGHT_STATUS_INFO_COLOR_POINTERS,
  LIGHT_STATUS_INVERTED_LUMINANCE_VALUES,
  LIGHT_STATUS_LUMINANCE_VALUES,
  LIGHT_STATUS_TEXT_LUMINANCE,
  LIGHT_STATUS_TEXT_MAX_LUMINANCE,
  NEUTRAL_DARK_LUMINANCE_VALUES,
  NEUTRAL_LIGHT_LUMINANCE_VALUES,
  SemanticColorName,
  StaticColor,
  StatusColorName,
  STATUS_COLOR_POINTERS,
  STATUS_TEXT_COLOR_TARGETS,
  SystemFontFamily,
  TEXT_COLOR_TARGETS,
  ThemeColor,
  ThemeColorName,
} from "../shared/models/theme.models"
import type { VarData } from "./CharHash"
import { CharHash } from "./CharHash"

export const THEME_PREFIX = "$"

// TYPES //////////////////////////////////////////////////////////////////////
type ThemePropValue = string | Record<string, string>
type CssValue = string
type ScaleEntry = VarData & {
  value: CssValue
}
type ThemeProps<T extends string | number | symbol = string> = Record<T, ThemePropValue>
type CssValueMap<T extends string | number | symbol = string> = Record<T, CssValue>
export type BaseScale<T extends string | number | symbol = string | number | symbol> = Record<T, ScaleEntry>

type FontSize = BaseScale<
  | 14
  | 16
  | 18
  | 21
  | 25
  | 30
  | 36
  | 44
  | 56
  | 72
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "code"
  | "quote"
  | "field"
  | "button"
  | "fieldTiny"
  | "fieldSmall"
  | "fieldLarge"
  | "buttonTiny"
  | "buttonSmall"
  | "buttonLarge"
>
type FontWeight = BaseScale<
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "a"
  | "code"
  | "quote"
>
type FontFamily = BaseScale<
  | "heading"
  | "body"
  | "button"
  | "code"
  | "quote"
  | "systemSans"
  | "systemSerif"
  | "systemMono"
  | keyof typeof BodyFontFamily
  | keyof typeof HeadingFontFamily
  | keyof typeof CodeFontFamily
>

type ColorScaleRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type StatusColors = "error" | "info" | "success" | "warning"
type CoreColorKeys =
  | `primary${ColorScaleRange}`
  | `secondary${ColorScaleRange}`
  | `neutral${ColorScaleRange}`
  | StatusColors
  | "shadowBase"
type ColorScale = Record<CoreColorKeys, ScaleEntry>
export type ColorPalette = {
  [key in ThemeColor]: ScaleEntry
}
type ColorSetter = (key: keyof ColorPalette, value?: string) => ScaleEntry

export interface ThemeScale<
  S extends BaseScale,
  T extends ThemeProps,
  C extends CssValueMap,
  A extends Record<string | number, keyof C> = Record<string, keyof C>
> {
  /** Used for theme definition and customization */
  scale: S
  /** For color scales, the default scale is `light`, so they may also return a `dark` scale */
  darkScale?: Record<keyof S, ScaleEntry>
  /** Used for building a consumable, typed $theme object, with CSS var references and spreadable combo props */
  themeProps: T
  /** Used to generate static CSS classes, and the prop values that reference them */
  cssValueMap: C
  /** Used to generate aliases for some CSS classes */
  cssAliasMap?: A
}

// THEME VALUES ///////////////////////////////////////////////////////////////
// SIZE SCALE /////////////////////////////////////////////////////////////////
/** Generator function for `size` theme scale */
export function getSize(hash: CharHash) {
  const base = { ...hash.var, value: "4rem" } as const

  const sharedScale = {
    0: { ...hash.var, value: "0" },
    1: { ...hash.var, value: "1rem" },
    2: { ...hash.var, value: `calc(${base.ref} / 2)` },
    4: { ...hash.var, value: base.ref },
    8: { ...hash.var, value: `calc(${base.ref} * 2)` },
    12: { ...hash.var, value: `calc(${base.ref} * 3)` },
    16: { ...hash.var, value: `calc(${base.ref} * 4)` },
    20: { ...hash.var, value: `calc(${base.ref} * 5)` },
    24: { ...hash.var, value: `calc(${base.ref} * 6)` },
    32: { ...hash.var, value: `calc(${base.ref} * 8)` },
    40: { ...hash.var, value: `calc(${base.ref} * 10)` },
    56: { ...hash.var, value: `calc(${base.ref} * 14)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
    120: { ...hash.var, value: `calc(${base.ref} * 30)` },
    200: { ...hash.var, value: `calc(${base.ref} * 50)` },
    320: { ...hash.var, value: `calc(${base.ref} * 80)` },
    480: { ...hash.var, value: `calc(${base.ref} * 120)` },
    640: { ...hash.var, value: `calc(${base.ref} * 160)` },
    buttonTactileHighlight: { ...hash.var, value: "1rem" },
    buttonTactileShadow: { ...hash.var, value: "4rem" },
  } as const

  const scale = { ...sharedScale, base } as const
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// SPACE SCALE ////////////////////////////////////////////////////////////////
/** Generator function for `space` theme scale */
export function getSpace<T extends BaseScale>(hash: CharHash, size: T) {
  const base = { ...hash.var, value: size.base.ref } as const
  const size4 = { ...hash.var, value: base.ref } as const
  const size8 = { ...hash.var, value: `calc(${base.ref} * 2)` } as const
  const size12 = { ...hash.var, value: `calc(${base.ref} * 3)` } as const

  const sharedScale = {
    0: { ...hash.var, value: "0" },
    1: { ...hash.var, value: "1rem" },
    2: { ...hash.var, value: `calc(${base.ref} / 2)` },
    4: size4,
    8: size8,
    12: size12,
    16: { ...hash.var, value: `calc(${base.ref} * 4)` },
    20: { ...hash.var, value: `calc(${base.ref} * 5)` },
    24: { ...hash.var, value: `calc(${base.ref} * 6)` },
    32: { ...hash.var, value: `calc(${base.ref} * 8)` },
    40: { ...hash.var, value: `calc(${base.ref} * 10)` },
    56: { ...hash.var, value: `calc(${base.ref} * 14)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
    buttonBasePx: { ...hash.var, value: size12.ref },
    buttonBasePy: { ...hash.var, value: size4.ref },
    tooltipBaseP: { ...hash.var, value: size8.ref },
  } as const

  const scale = { ...sharedScale, base } as const
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// RADIUS SCALE ///////////////////////////////////////////////////////////////
/** Generator function for `radius` theme scale */
export function getRadius(hash: CharHash) {
  const base = { ...hash.var, value: "4rem" } as const
  const field = { ...hash.var, value: base.ref } as const
  const rounded = { ...hash.var, value: `min(max(${field.ref}, 4rem), 4rem)` } as const

  const sharedScale = {
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

  const scale = { ...sharedScale, base } as const
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// COLUMN SCALE ///////////////////////////////////////////////////////////////
/** Generator function for `column` theme scale */
export function getColumn<T extends BaseScale>(hash: CharHash, size: T) {
  const base = { ...hash.var, value: size.base.ref } as const
  const repeaterMin = { ...hash.var, value: "0" } as const

  const c40 = { ...hash.var, value: `calc(${base.ref} * 10)` } as const
  const c80 = { ...hash.var, value: `calc(${base.ref} * 20)` } as const
  const c120 = { ...hash.var, value: `calc(${base.ref} * 30)` } as const
  const c200 = { ...hash.var, value: `calc(${base.ref} * 50)` } as const
  const c320 = { ...hash.var, value: `calc(${base.ref} * 80)` } as const

  const sharedScale = {
    40: c40,
    80: c80,
    120: c120,
    200: c200,
    320: c320,
  } as const

  const scale = { ...sharedScale, repeaterMin } as const
  const cssValueMap = {
    ...getValuesFromScale(sharedScale),
    1: `repeat(1, minmax(${repeaterMin.ref}, 1fr))`,
    2: `repeat(2, minmax(${repeaterMin.ref}, 1fr))`,
    3: `repeat(3, minmax(${repeaterMin.ref}, 1fr))`,
    4: `repeat(4, minmax(${repeaterMin.ref}, 1fr))`,
    5: `repeat(5, minmax(${repeaterMin.ref}, 1fr))`,
    6: `repeat(6, minmax(${repeaterMin.ref}, 1fr))`,
    7: `repeat(7, minmax(${repeaterMin.ref}, 1fr))`,
    8: `repeat(8, minmax(${repeaterMin.ref}, 1fr))`,
    9: `repeat(9, minmax(${repeaterMin.ref}, 1fr))`,
    10: `repeat(10, minmax(${repeaterMin.ref}, 1fr))`,
    11: `repeat(11, minmax(${repeaterMin.ref}, 1fr))`,
    12: `repeat(12, minmax(${repeaterMin.ref}, 1fr))`,
    fill40: `repeat(auto-fill, minmax(${c40}, 1fr))`,
    fill80: `repeat(auto-fill, minmax(${c80}, 1fr))`,
    fill120: `repeat(auto-fill, minmax(${c120}, 1fr))`,
    fill200: `repeat(auto-fill, minmax(${c200}, 1fr))`,
    fill320: `repeat(auto-fill, minmax(${c320}, 1fr))`,
    fit40: `repeat(auto-fit, minmax(${c40}, 1fr))`,
    fit80: `repeat(auto-fit, minmax(${c80}, 1fr))`,
    fit120: `repeat(auto-fit, minmax(${c120}, 1fr))`,
    fit200: `repeat(auto-fit, minmax(${c200}, 1fr))`,
    fit320: `repeat(auto-fit, minmax(${c320}, 1fr))`,
  }
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// ROW SCALE //////////////////////////////////////////////////////////////////
/** Generator function for `row` theme scale */
export function getRow<T extends BaseScale>(hash: CharHash, column: T) {
  const r40 = { ...hash.var, value: column[40].ref } as const
  const r80 = { ...hash.var, value: column[80].ref } as const
  const r120 = { ...hash.var, value: column[120].ref } as const
  const r200 = { ...hash.var, value: column[200].ref } as const
  const r320 = { ...hash.var, value: column[320].ref } as const

  const sharedScale = {
    40: r40,
    80: r80,
    120: r120,
    200: r200,
    320: r320,
  } as const

  const scale = sharedScale
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// Z INDEX SCALE //////////////////////////////////////////////////////////////
/** Generator function for `zIndex` theme scale */
export function getZIndex(hash: CharHash) {
  const scale = {
    0: { ...hash.var, value: "0" },
    1: { ...hash.var, value: "10" },
    2: { ...hash.var, value: "50" },
    3: { ...hash.var, value: "100" },
    4: { ...hash.var, value: "200" },
    5: { ...hash.var, value: "300" },
    6: { ...hash.var, value: "400" },
    7: { ...hash.var, value: "500" },
    8: { ...hash.var, value: "600" },
    9: { ...hash.var, value: "700" },
    10: { ...hash.var, value: "800" },
    11: { ...hash.var, value: "900" },
    12: { ...hash.var, value: "1000" },
    min: { ...hash.var, value: "-1" },
    max: { ...hash.var, value: "9999" },
  } as const

  const cssValueMap = getValuesFromScale(scale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// LINE HEIGHT SCALE //////////////////////////////////////////////////////////
/** Generator function for `lineHeight` theme scale */
export function getLineHeight<T extends BaseScale>(hash: CharHash, size: T) {
  const base = { ...hash.var, value: "1.65" } as const
  const modifier = { ...hash.var, value: "0" } as const
  const lh20 = { ...hash.var, value: `calc(${size[20].ref} + ${modifier.ref})` } as const
  const field = { ...hash.var, value: lh20.ref } as const

  const sharedScale = {
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

  const scale = { ...sharedScale, base } as const
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// TYPE SPACE SCALE ///////////////////////////////////////////////////////////
/** Generator function for `typeSpace` theme scale */
export function getTypeSpace(hash: CharHash) {
  const emBase = { ...hash.var, value: "0em" } as const
  const remBase = { ...hash.var, value: "0rem" } as const
  const chBase = { ...hash.var, value: "0ch" } as const

  const sharedScale = {
    emBase,
    emMin: { ...hash.var, value: `calc(${emBase.ref} - 0.125em)` },
    emMax: { ...hash.var, value: `calc(${emBase.ref} + 0.125em)` },
    remBase,
    remMin: { ...hash.var, value: `calc(${remBase.ref} - 2rem)` },
    remMax: { ...hash.var, value: `calc(${remBase.ref} + 2rem)` },
    chBase,
    chMin: { ...hash.var, value: `calc(${chBase.ref} - 0.2ch)` },
    chMax: { ...hash.var, value: `calc(${chBase.ref} + 0.2ch)` },
  } as const

  const scale = sharedScale
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// TEXT DECORATION SCALE //////////////////////////////////////////////////////
/** Generator function for `textDecoration` theme scale */
export function getTextDecoration<T extends ColorScale>(hash: CharHash, color: T) {
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
  const infoColor = { ...hash.var, value: color.info.ref } as const
  const successColor = { ...hash.var, value: color.success.ref } as const
  const warningColor = { ...hash.var, value: color.warning.ref } as const
  const errorColor = { ...hash.var, value: color.error.ref } as const

  const scale = {
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
  }
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// SHADOW SCALE ///////////////////////////////////////////////////////////////
/** Generator function for `shadow` theme scale */
export function getShadow<T extends ColorScale>(hash: CharHash, color: T) {
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

  const scale = {
    low,
    medium,
    high,
    highSoft,
  } as const
  const darkScale = {
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
  const cssValueMap = getValuesFromScale(scale)
  const themeProps = cssValueMap

  return {
    scale,
    darkScale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// FONT SIZE SCALE /////////////////////////////////////////////////////////////////
/** Generator function for `fontSize` theme scale */
export function getFontSize(hash: CharHash) {
  const base = { ...hash.var, value: "16rem" } as const
  const baseScale = {
    14: { ...hash.var, value: `calc(${base.ref} - 2rem)` },
    16: { ...hash.var, value: base.ref },
    18: { ...hash.var, value: `calc(${base.ref} + 2rem)` },
    21: { ...hash.var, value: `calc(${base.ref} + 5rem)` },
    25: { ...hash.var, value: `calc(${base.ref} + 9rem)` },
    30: { ...hash.var, value: `calc(${base.ref} + 14rem)` },
    36: { ...hash.var, value: `calc(${base.ref} + 20rem)` },
    44: { ...hash.var, value: `calc(${base.ref} + 28rem)` },
    56: { ...hash.var, value: `calc(${base.ref} + 40rem)` },
    72: { ...hash.var, value: `calc(${base.ref} + 56rem)` },
  }

  const h2 = { ...hash.var, value: baseScale[30].ref } as const
  const p = { ...hash.var, value: baseScale[16].ref } as const
  const field = { ...hash.var, value: p.ref } as const
  const button = { ...hash.var, value: field.ref } as const

  const sharedScale = {
    ...baseScale,
    // Typo elements
    h1: { ...hash.var, value: baseScale[44].ref },
    h2,
    h3: { ...hash.var, value: baseScale[25].ref },
    h4: { ...hash.var, value: baseScale[21].ref },
    h5: { ...hash.var, value: baseScale[18].ref },
    h6: { ...hash.var, value: baseScale[16].ref },
    p,
    code: { ...hash.var, value: p.ref },
    quote: { ...hash.var, value: h2.ref },
    // Components
    field,
    button,
    fieldTiny: { ...hash.var, value: `calc(${field.ref} * 0.8)` },
    fieldSmall: { ...hash.var, value: `calc(${field.ref} * 0.9)` },
    fieldLarge: { ...hash.var, value: `calc(${field.ref} * 1.25)` },
    buttonTiny: { ...hash.var, value: `calc(${button.ref} * 0.8)` },
    buttonSmall: { ...hash.var, value: `calc(${button.ref} * 0.9)` },
    buttonLarge: { ...hash.var, value: `calc(${button.ref} * 1.25)` },
  } as const

  const scale = { ...sharedScale, base } as const
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// FONT WEIGHT SCALE /////////////////////////////////////////////////////////////////
/** Generator function for `fontWeight` theme scale */
export function getFontWeight(hash: CharHash) {
  const baseScale = {
    "100": { ...hash.var, value: "100" },
    "200": { ...hash.var, value: "200" },
    "300": { ...hash.var, value: "300" },
    "400": { ...hash.var, value: "400" },
    "500": { ...hash.var, value: "500" },
    "600": { ...hash.var, value: "600" },
    "700": { ...hash.var, value: "700" },
    "800": { ...hash.var, value: "800" },
    "900": { ...hash.var, value: "900" },
  } as const

  const p = { ...hash.var, value: baseScale[300].ref } as const

  const sharedScale = {
    ...baseScale,
    h1: { ...hash.var, value: baseScale[600].ref },
    h2: { ...hash.var, value: baseScale[700].ref },
    h3: { ...hash.var, value: baseScale[600].ref },
    h4: { ...hash.var, value: baseScale[900].ref },
    h5: { ...hash.var, value: baseScale[600].ref },
    h6: { ...hash.var, value: baseScale[800].ref },
    p,
    a: { ...hash.var, value: p.ref },
    code: { ...hash.var, value: baseScale[600].ref },
    quote: { ...hash.var, value: baseScale[300].ref },
  } as const

  const scale = sharedScale
  const cssValueMap = getValuesFromScale(sharedScale)
  const cssAliasMap = {
    thin: "100",
    extraLight: "200",
    light: "300",
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
    extraBold: "800",
    black: "900",
  } as const
  const themeProps = { ...cssValueMap, ...getPropsFromAliasMap(cssAliasMap) }

  return {
    scale,
    themeProps,
    cssValueMap,
    cssAliasMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap, typeof cssAliasMap>
}

// FONT FAMILY SCALE /////////////////////////////////////////////////////////////////
// Font definition
export const DEFAULT_FONTS: Required<FontFamilySpec> = {
  body: "sourceSansPro",
  button: "sourceSansPro",
  heading: "montserrat",
  code: "firaCode",
}
/** Generator function for `fontFamily` theme scale */
export function getFontFamily(hash: CharHash) {
  const baseScale = {
    systemSans: { ...hash.var, value: SystemFontFamily.sansSerif },
    systemSerif: { ...hash.var, value: SystemFontFamily.serif },
    systemMono: { ...hash.var, value: SystemFontFamily.monospace },
    ...enumKeys(BodyFontFamily).reduce(
      (output: Record<keyof typeof BodyFontFamily, ScaleEntry>, key: keyof typeof BodyFontFamily) => {
        output[key] = { ...hash.var, value: `"${BodyFontFamily[key]}"` } as const
        return output
      },
      {} as Record<keyof typeof BodyFontFamily, ScaleEntry>
    ),
    ...enumKeys(HeadingFontFamily).reduce(
      (output: Record<keyof typeof HeadingFontFamily, ScaleEntry>, key: keyof typeof HeadingFontFamily) => {
        output[key] = { ...hash.var, value: `"${HeadingFontFamily[key]}"` } as const
        return output
      },
      {} as Record<keyof typeof HeadingFontFamily, ScaleEntry>
    ),
    ...enumKeys(CodeFontFamily).reduce(
      (output: Record<keyof typeof CodeFontFamily, ScaleEntry>, key: keyof typeof CodeFontFamily) => {
        output[key] = { ...hash.var, value: `"${CodeFontFamily[key]}"` } as const
        return output
      },
      {} as Record<keyof typeof CodeFontFamily, ScaleEntry>
    ),
  } as const

  const heading = {
    ...hash.var,
    value: `${baseScale[DEFAULT_FONTS.heading].ref}, ${baseScale.systemSerif.ref}`,
  } as const

  const sharedScale = {
    ...baseScale,
    heading,
    body: { ...hash.var, value: `${baseScale[DEFAULT_FONTS.body].ref}, ${baseScale.systemSans.ref}` },
    button: { ...hash.var, value: `${baseScale[DEFAULT_FONTS.button].ref}, ${baseScale.systemSans.ref}` },
    code: { ...hash.var, value: `${baseScale[DEFAULT_FONTS.code].ref}, ${baseScale.systemMono.ref}` },
    quote: { ...hash.var, value: `${heading.ref}, ${baseScale.systemSerif.ref}` },
  } as const

  const scale = sharedScale
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// FONT SCALE /////////////////////////////////////////////////////////////////
/** Generator function for `font` theme scale */
export function getFont<S extends FontSize, W extends FontWeight, F extends FontFamily>(
  hash: CharHash,
  fontSize: S,
  fontWeight: W,
  fontFamily: F
) {
  const baseScale = {
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

  const sharedScale = {
    ...baseScale,
    // Elements
    li: { ...hash.var, value: baseScale.body.ref },
    small: { ...hash.var, value: `${fontSize[14].ref} ${fontWeight.p.ref} ${fontFamily.body.ref}` },
    em: { ...hash.var, value: `italic ${fontSize.p.ref} ${fontWeight.p.ref} ${fontFamily.body.ref}` },
    strong: { ...hash.var, value: `${fontSize.p.ref} ${fontWeight[700].ref} ${fontFamily.body.ref}` },
  } as const

  const scale = sharedScale
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// COLOR SCALE ////////////////////////////////////////////////////////////////
// Default Palette
export const DEFAULT_HUE = 174
export const DEFAULT_PALETTE = 2
// Alt1 Palette
// export const DEFAULT_HUE = 217
// export const DEFAULT_PALETTE = 3
// Alt2 Palette
// export const DEFAULT_HUE = 224
// export const DEFAULT_PALETTE = 2
/** Generator function for `color` theme scale */
export function getColor(hash: CharHash) {
  const palette = {} as ColorPalette
  const lightPalette = generateThemeColors(
    generatePaletteFromHue(DEFAULT_HUE, DEFAULT_PALETTE),
    "light",
    (key: keyof ColorPalette, value?: string | ScaleEntry) => {
      if (value) {
        if (typeof value === "string") {
          palette[key] = palette[key] ? { ...palette[key], value } : { ...hash.var, value }
        } else {
          palette[key] = palette[key] ? { ...palette[key], value: value.ref } : { ...hash.var, value: value.ref }
        }
      }
      if (!palette[key]) {
        palette[key] = { ...hash.var, value: typeof value === "object" && value?.ref ? value.ref : String(value) }
      }
      return palette[key]
    }
  )
  const shadowBase = { ...hash.var, value: "53 0% 7%" }

  const lightScale = {
    shadowBase,
    shadowBlack: { ...hash.var, value: "hsl(0 0% 0%)" },
    defaultBody: { ...hash.var, value: lightPalette.textNeutral2.ref },
    defaultHeading: { ...hash.var, value: lightPalette.neutral10.ref },
    // Unique to light palette
    panel: { ...hash.var, value: lightPalette.neutralMin.ref },
    shadowLight: { ...hash.var, value: `hsl(${shadowBase.ref} / 0.05)` },
    shadowHeavy: { ...hash.var, value: `hsl(${shadowBase.ref} / 0.15)` },
    ...lightPalette,
  } as const

  const darkScale = {
    shadowBase,
    shadowBlack: lightScale.shadowBlack,
    defaultBody: lightScale.defaultBody,
    defaultHeading: lightScale.defaultHeading,
    // Unique to dark palette
    panel: { ...lightScale.panel, value: lightScale.neutral3.ref },
    shadowLight: { ...lightScale.shadowLight, value: `hsl(${shadowBase.ref} / 0.2)` },
    shadowHeavy: { ...lightScale.shadowHeavy, value: `hsl(${shadowBase.ref} / 0.35)` },
    ...generateThemeColors(
      generatePaletteFromHue(DEFAULT_HUE, DEFAULT_PALETTE, 1, "dark"),
      "dark",
      (key: keyof ColorPalette, value?: string | ScaleEntry) => {
        if (value) {
          if (typeof value === "string") {
            return { ...lightScale[key], value }
          }
          return { ...lightScale[key], value: value.ref }
        }
        return lightScale[key]
      }
    ),
  } as const

  ////////////////////////////////////////////////////////////////////////////////
  const scale = lightScale
  const cssValueMap = getValuesFromScale(lightScale)
  const themeProps = cssValueMap

  return {
    scale,
    darkScale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// BORDER SCALE ///////////////////////////////////////////////////////////////
/** Generator function for `border` theme scale */
export function getBorder<T extends ColorScale>(hash: CharHash, color: T) {
  const widthBase = { ...hash.var, value: "2rem" } as const
  const widthMin = { ...hash.var, value: `calc(${widthBase.ref} - 1rem)` } as const
  const widthMax = { ...hash.var, value: `calc(${widthBase.ref} + 2rem)` } as const
  const primaryColorBase = { ...hash.var, value: color.primary8.ref } as const
  const primaryColorMin = { ...hash.var, value: color.primary6.ref } as const
  const primaryColorMax = { ...hash.var, value: color.primary9.ref } as const
  const secondaryColorBase = { ...hash.var, value: color.secondary8.ref } as const
  const secondaryColorMin = { ...hash.var, value: color.secondary6.ref } as const
  const secondaryColorMax = { ...hash.var, value: color.secondary9.ref } as const
  const neutralColorBase = { ...hash.var, value: color.neutral7.ref } as const
  const neutralColorMin = { ...hash.var, value: color.neutral4.ref } as const
  const neutralColorMax = { ...hash.var, value: color.neutral9.ref } as const

  const defaultWidth = { ...hash.var, value: widthBase.ref } as const
  const defaultStyle = { ...hash.var, value: "solid" } as const

  const sharedScale = {
    widthBase,
    widthMin,
    widthMax,
    primaryColorBase,
    primaryColorMin,
    primaryColorMax,
    secondaryColorBase,
    secondaryColorMin,
    secondaryColorMax,
    neutralColorBase,
    neutralColorMin,
    neutralColorMax,
    // Composition Combos
    primary: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${primaryColorBase.ref}` },
    primaryMin: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${primaryColorMin.ref}` },
    primaryMax: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${primaryColorMax.ref}` },
    secondary: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${secondaryColorBase.ref}` },
    secondaryMin: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${secondaryColorMin.ref}` },
    secondaryMax: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${secondaryColorMax.ref}` },
    neutral: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${neutralColorBase.ref}` },
    neutralMin: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${neutralColorMin.ref}` },
    neutralMax: { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${neutralColorMax.ref}` },
    // Defaults are not added here, because they are just internal reference vars;
    // they can only be consumed via the composite combos.
  } as const

  const scale = { ...sharedScale, defaultWidth, defaultStyle } as const
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = cssValueMap

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

// OUTLINE SCALE //////////////////////////////////////////////////////////////
/** Generator function for `outline` theme scale */
export function getOutline<T extends ColorScale>(hash: CharHash, color: T) {
  const widthBase = { ...hash.var, value: "2rem" } as const
  const widthMin = { ...hash.var, value: `calc(${widthBase.ref} - 1rem)` } as const
  const widthMax = { ...hash.var, value: `calc(${widthBase.ref} + 2rem)` } as const
  const primaryColorBase = { ...hash.var, value: color.primary8.ref } as const
  const primaryColorMin = { ...hash.var, value: color.primary6.ref } as const
  const primaryColorMax = { ...hash.var, value: color.primary9.ref } as const
  const secondaryColorBase = { ...hash.var, value: color.secondary8.ref } as const
  const secondaryColorMin = { ...hash.var, value: color.secondary6.ref } as const
  const secondaryColorMax = { ...hash.var, value: color.secondary9.ref } as const
  const neutralColorBase = { ...hash.var, value: color.neutral7.ref } as const
  const neutralColorMin = { ...hash.var, value: color.neutral4.ref } as const
  const neutralColorMax = { ...hash.var, value: color.neutral9.ref } as const
  const offsetBase = { ...hash.var, value: widthBase.ref } as const
  const offsetMin = { ...hash.var, value: `max(0, calc(${offsetBase.ref}) - 2rem)` } as const
  const offsetMax = { ...hash.var, value: `calc(${offsetBase.ref} + 2rem)` } as const

  const defaultWidth = { ...hash.var, value: widthBase.ref } as const
  const defaultStyle = { ...hash.var, value: "solid" } as const
  const defaultOffset = { ...hash.var, value: offsetBase.ref } as const
  const defaultOffsetMin = { ...hash.var, value: defaultOffset.ref } as const
  const defaultOffsetMax = { ...hash.var, value: defaultOffset.ref } as const

  const primary = { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${primaryColorBase.ref}` }
  const primaryMin = { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${primaryColorMin.ref}` }
  const primaryMax = { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${primaryColorMax.ref}` }
  const secondary = { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${secondaryColorBase.ref}` }
  const secondaryMin = { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${secondaryColorMin.ref}` }
  const secondaryMax = { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${secondaryColorMax.ref}` }
  const neutral = { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${neutralColorBase.ref}` }
  const neutralMin = { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${neutralColorMin.ref}` }
  const neutralMax = { ...hash.var, value: `${defaultWidth.ref} ${defaultStyle.ref} ${neutralColorMax.ref}` }

  const sharedScale = {
    widthBase,
    widthMin,
    widthMax,
    primaryColorBase,
    primaryColorMin,
    primaryColorMax,
    secondaryColorBase,
    secondaryColorMin,
    secondaryColorMax,
    neutralColorBase,
    neutralColorMin,
    neutralColorMax,
    offsetBase,
    offsetMin,
    offsetMax,
    // Defaults are not added here, because they are just internal reference vars;
    // they can only be consumed via the composite combos.
  } as const

  const scale = {
    ...sharedScale,
    defaultWidth,
    defaultStyle,
    defaultOffset,
    defaultOffsetMin,
    defaultOffsetMax,
    // Composition Combos
    primary,
    primaryMin,
    primaryMax,
    secondary,
    secondaryMin,
    secondaryMax,
    neutral,
    neutralMin,
    neutralMax,
  } as const
  const cssValueMap = getValuesFromScale(sharedScale)
  const themeProps = {
    ...cssValueMap,
    primaryProps: { outline: primary.ref, outlineOffset: defaultOffset.ref },
    primaryMinProps: { outline: primaryMin.ref, outlineOffset: defaultOffsetMin.ref },
    primaryMaxProps: { outline: primaryMax.ref, outlineOffset: defaultOffsetMax.ref },
    secondaryProps: { outline: secondary.ref, outlineOffset: defaultOffset.ref },
    secondaryMinProps: { outline: secondaryMin.ref, outlineOffset: defaultOffsetMin.ref },
    secondaryMaxProps: { outline: secondaryMax.ref, outlineOffset: defaultOffsetMax.ref },
    neutralProps: { outline: neutral.ref, outlineOffset: defaultOffset.ref },
    neutralMinProps: { outline: neutralMin.ref, outlineOffset: defaultOffsetMin.ref },
    neutralMaxProps: { outline: neutralMax.ref, outlineOffset: defaultOffsetMax.ref },
  }

  return {
    scale,
    themeProps,
    cssValueMap,
  } as ThemeScale<typeof scale, typeof themeProps, typeof cssValueMap>
}

///////////////////////////////////////////////////////////////////////////////
// HELPERS ////////////////////////////////////////////////////////////////////
/** Converts a scale to CSS values (i.e., using the scale's `ref` as a value) */
function getValuesFromScale<T extends BaseScale>(scale: T) {
  const entries: [keyof T, ScaleEntry][] = Object.entries(scale)
  return entries.reduce((out: Record<keyof T, CssValue>, [key, entry]: [keyof T, ScaleEntry]) => {
    out[key] = entry.ref
    return out
  }, {} as Record<keyof T, CssValue>)
}

/** Converts a CSS Alias Map into theme props */
function getPropsFromAliasMap<T extends Record<string | number, string>>(map: T) {
  return Object.entries(map).reduce((out: Record<keyof T, string>, [key, value]: [keyof T, string]) => {
    // Add a prefix, to convert the value to a "themed value"
    out[key] = `${THEME_PREFIX}${value}`
    return out
  }, {} as Record<keyof T, string>)
}

/** Generates a color object (w/ keys numbered 1-12), from a list of 12 values */
function getColorObjectFromValueList<N extends string>(name: N, list: string[], setValue: ColorSetter) {
  return list.reduce((output, value, index): Record<ColorKeys<N>, ScaleEntry> => {
    const colorNumber = (index + 1) as ColorNumberKey
    const key: ColorKeys<N> = `${name}${colorNumber}`
    output[key] = setValue(key as keyof ColorPalette, value)
    return output
  }, {} as Record<ColorKeys<N>, ScaleEntry>)
}

/** Generates a color mode-based palette */
function generateThemeColors(
  inputColors: ColorGenOptions,
  mode: ColorMode,
  setValue: ColorSetter,
  isHighContrastNeutral = false
): ColorPalette {
  type ColorKey = keyof ColorPalette

  const isDark = mode === "dark"
  const max = inputColors.neutralMax || isDark ? "#fff" : "#000"
  const min = inputColors.neutralMin || isDark ? "#000" : "#fff"
  // Init with neutral max and min (black & white)
  const colors = {
    black: setValue("black", "#000"),
    white: setValue("white", "#fff"),
    [StaticColor.neutralMax]: setValue(StaticColor.neutralMax, max),
    [StaticColor.neutralMin]: setValue(StaticColor.neutralMin, min),
    ...getColorObjectFromValueList(
      AlphaColorName.neutralMaxA,
      getAlphaColors(max, true, isDark, isDark ? "light" : "dark"),
      setValue
    ),
    ...getColorObjectFromValueList(
      AlphaColorName.neutralMinA,
      getAlphaColors(min, true, isDark, isDark ? "dark" : "light"),
      setValue
    ),
  } as ColorPalette

  const colorNames: (SemanticColorName | FlavorColorName | StatusColorName)[] = [
    ...enumValues(SemanticColorName),
    ...enumValues(FlavorColorName),
    ...enumValues(StatusColorName),
  ]

  // Calculate the named colors and the color values that go with each one
  colorNames.forEach((name: ThemeColorName): void => {
    const color =
      inputColors[name as keyof typeof inputColors] || DEFAULT_SOURCE_COLORS[name as keyof typeof DEFAULT_SOURCE_COLORS]
    if (!color) {
      return
    }
    const lowerName = name.toLowerCase()
    const isNeutral = lowerName.includes("neutral")
    const isInfo = lowerName.includes("info")
    const isStatus = !!StatusColorName[name as keyof typeof StatusColorName]
    const isFlavor = !!FlavorColorName[name as keyof typeof FlavorColorName]
    let hashKey

    if (isStatus) {
      // Create status color scale (only a 3-point scale: min, normal, max)
      const isAlt = name === "warning" || (isDark && name === "info")
      const defaultTextColor = isDark || isAlt ? setValue("black").ref : setValue("white").ref
      const darkLum = isAlt ? DARK_STATUS_INVERTED_LUMINANCE_VALUES : DARK_STATUS_LUMINANCE_VALUES
      const lightLum = isAlt ? LIGHT_STATUS_INVERTED_LUMINANCE_VALUES : LIGHT_STATUS_LUMINANCE_VALUES
      const statusLuminanceValues = isDark ? darkLum : lightLum
      const typo = getChromaObject(color)
      const fgColor = isDark ? typo.luminance(DARK_STATUS_TEXT_LUMINANCE) : typo.luminance(LIGHT_STATUS_TEXT_LUMINANCE)
      const fgColorMax = isDark
        ? typo.luminance(DARK_STATUS_TEXT_MAX_LUMINANCE)
        : typo.luminance(LIGHT_STATUS_TEXT_MAX_LUMINANCE)
      hashKey = `${name}Foreground` as ColorKey
      colors[hashKey] = setValue(hashKey, fgColor.css("hsl"))
      hashKey = `${name}ForegroundMax` as ColorKey
      colors[hashKey] = setValue(hashKey, fgColorMax.css("hsl"))

      getColorRange(color, statusLuminanceValues, true).forEach((colorValue, index) => {
        const pointer = STATUS_COLOR_POINTERS[index as keyof typeof STATUS_COLOR_POINTERS]
        const textPointer = STATUS_TEXT_COLOR_TARGETS[index as keyof typeof STATUS_TEXT_COLOR_TARGETS]
        const infoTextPointer = isDark
          ? DARK_INFO_STATUS_TEXT_COLOR_TARGETS[index as keyof typeof DARK_INFO_STATUS_TEXT_COLOR_TARGETS]
          : LIGHT_INFO_STATUS_TEXT_COLOR_TARGETS[index as keyof typeof LIGHT_INFO_STATUS_TEXT_COLOR_TARGETS]
        const key = `${name}${pointer}`
        const infoPointer = isDark
          ? DARK_STATUS_INFO_COLOR_POINTERS[index as keyof typeof DARK_STATUS_INFO_COLOR_POINTERS]
          : LIGHT_STATUS_INFO_COLOR_POINTERS[index as keyof typeof LIGHT_STATUS_INFO_COLOR_POINTERS]
        const textColor = isInfo
          ? setValue(`neutral${infoTextPointer}`).ref
          : setValue(`${name}${textPointer || ""}` as keyof ColorPalette).ref

        let value = isInfo ? setValue(`neutral${infoPointer}`).ref : colorValue
        hashKey = key as ColorKey
        colors[hashKey] = setValue(hashKey, value)

        value = textPointer ? textColor : defaultTextColor
        hashKey = `text${capitalizeFirstLetter(key)}` as ColorKey
        colors[hashKey] = setValue(hashKey, value)
      })
    } else {
      // Create non-status color scale
      const darkScale = isNeutral ? NEUTRAL_DARK_LUMINANCE_VALUES : DARK_LUMINANCE_VALUES
      const lightScale = isNeutral ? NEUTRAL_LIGHT_LUMINANCE_VALUES : LIGHT_LUMINANCE_VALUES
      const luminanceValues = isDark ? darkScale : lightScale
      const neutralTextColor = setValue("neutralMin").ref

      getColorRange(color, luminanceValues, isNeutral, isDark, isNeutral && isHighContrastNeutral).forEach(
        (colorValue, index, scale) => {
          const pointer = index + 1
          const textPointer = TEXT_COLOR_TARGETS[pointer as keyof typeof TEXT_COLOR_TARGETS]
          const key = `${name}${pointer}`
          const alphaValue = (
            index < FG_COLOR_INDEX ? scale[FG_COLOR_INDEX as keyof typeof scale] : colorValue
          ) as ChromaColor
          let value = colorValue
          hashKey = key as ColorKey
          colors[hashKey] = setValue(hashKey, value)
          if (!isFlavor) {
            value = getAlphaColorAtIndex(index, alphaValue, isDark, isDark ? "light" : "dark")
            hashKey = `${name}A${pointer}` as ColorKey
            colors[hashKey] = setValue(hashKey, value)
          }
          value = textPointer ? setValue(`${name}${textPointer}` as keyof ColorPalette).ref : neutralTextColor
          hashKey = `text${capitalizeFirstLetter(key)}` as ColorKey
          colors[hashKey] = setValue(hashKey, value)
        }
      )
    }
  })
  return colors as ColorPalette
}
