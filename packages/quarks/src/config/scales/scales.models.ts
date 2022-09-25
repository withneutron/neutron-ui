import { THEME_PREFIX, VarData } from "../utils"
import { BodyFontFamily, HeadingFontFamily, CodeFontFamily, ThemeColor } from "../../shared/models"

// TYPES //////////////////////////////////////////////////////////////////////
export type ThemePropValue = string
export type CssValue = string | Record<string, string | number>
export type CssAlias<T extends string | number = string | number> = {
  var: string
  target: `${typeof THEME_PREFIX}${T}`
}
export type ScaleEntry = VarData & {
  value: CssValue
}
export type ThemeProps = Record<string | number, ThemePropValue>
export type CssValueMap = Record<string | number, CssValue>
export type CssAliasMap<C extends CssValueMap = CssValueMap> = Record<string | number, CssAlias<keyof Omit<C, symbol>>>
export type BaseVars<T extends string | number = string | number> = Record<T, ScaleEntry>

export type FontSize = BaseVars<
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
export type FontWeight = BaseVars<
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
export type FontFamily = BaseVars<
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

export type ColorScaleRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type StatusColors = "error" | "info" | "success" | "warning"
export type CoreColorKeys =
  | `primary${ColorScaleRange}`
  | `secondary${ColorScaleRange}`
  | `neutral${ColorScaleRange}`
  | StatusColors
  | "shadowBase"
export type ColorVars = Record<CoreColorKeys, ScaleEntry>
export type ColorPalette = {
  [key in ThemeColor]: ScaleEntry
}
export type ColorSetter = (key: keyof ColorPalette, value?: string) => ScaleEntry

export type KeyframeObject = Record<string, Record<string, string>>
export type Keyframes = Record<string, KeyframeObject>

export interface ThemeScale<
  S extends BaseVars = BaseVars,
  T extends ThemeProps = ThemeProps,
  C extends CssValueMap = CssValueMap,
  A extends CssAliasMap<C> | Record<any, any> = Record<any, any>,
  K extends Keyframes | Record<any, any> = Keyframes
> {
  /** Used for theme definition and customization */
  vars: S
  /** For color scales, the default set of vars is `light`, so they may also return a `dark` set */
  darkVars?: Record<keyof S, ScaleEntry>
  /** Used for building a consumable, typed $theme object, with theme tokens */
  themeProps: T
  /** Used to generate static CSS classes, and the prop values that reference them */
  cssValueMap: C
  /**
   * Used to generate aliases for some CSS classes
   *
   * NOTE: These keys must ALSO be added to `cssValueMap`, for the generated types to work properly.
   * NOTE 2: Thes keys MUST have the THEME_PREFIX as a prefix
   */
  cssAliasMap?: A
  /** Used for building keyframe-based animations */
  keyframes?: K
}

export enum Scale {
  animation = "animation",
  border = "border",
  color = "color",
  column = "column",
  font = "font",
  fontFamily = "fontFamily",
  fontSize = "fontSize",
  fontWeight = "fontWeight",
  lineHeight = "lineHeight",
  outline = "outline",
  radius = "radius",
  row = "row",
  shadow = "shadow",
  size = "size",
  space = "space",
  textDecoration = "textDecoration",
  typeSpace = "typeSpace",
  zIndex = "zIndex",
}

export type Scales = {
  [key in Scale]: ThemeScale
}

export type PrefixedKey<T extends Record<string | number | symbol, unknown>> = `${typeof THEME_PREFIX}${keyof Omit<
  T,
  symbol
>}`
