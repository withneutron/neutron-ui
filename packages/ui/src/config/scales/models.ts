import { VarData } from "packages/ui/src/config/CharHash"
import { BodyFontFamily, HeadingFontFamily, CodeFontFamily, ThemeColor } from "packages/ui/src/shared/models"

export const THEME_PREFIX = "$"

// TYPES //////////////////////////////////////////////////////////////////////
export type ThemePropValue = string
export type CssValue = string | Record<string, string | number>
export type ScaleEntry = VarData & {
  value: CssValue
}
export type ThemeProps<T extends string | number | symbol = string> = Record<T, ThemePropValue>
export type CssValueMap<T extends string | number | symbol = string> = Record<T, CssValue>
export type BaseVars<T extends string | number | symbol = string | number | symbol> = Record<T, ScaleEntry>

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
  S extends BaseVars,
  T extends ThemeProps,
  C extends CssValueMap,
  A extends Record<string | number, keyof C> = Record<string, keyof C>,
  K extends Keyframes = Keyframes
> {
  /** Used for theme definition and customization */
  vars: S
  /** For color scales, the default set of vars is `light`, so they may also return a `dark` set */
  darkVars?: Record<keyof S, ScaleEntry>
  /** Used for building a consumable, typed $theme object, with CSS var references and spreadable combo props */
  themeProps: T
  /** Used to generate static CSS classes, and the prop values that reference them */
  cssValueMap: C
  /** Used to generate aliases for some CSS classes */
  cssAliasMap?: A
  /** Used for building keyframe-based animations */
  keyframes?: K
}