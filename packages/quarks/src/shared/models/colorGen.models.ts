import { m } from "./encodedColors.models"

// CONSTANTS //////////////////////////////////////////////////////////////////////////////////////

export const DEFAULT_COLOR_MODE = "light" as const

export const BASE_STYLE_SIZE = 4
export const STYLE_UNIT = "rem"

// Neutron Palette
export const DEFAULT_HUE = 240
export const DEFAULT_PALETTE = 2
// Launchfox Palette
// export const DEFAULT_HUE = 217
// export const DEFAULT_PALETTE = 3
// Stepflow Palette
// export const DEFAULT_HUE = 224
// export const DEFAULT_PALETTE = 2

export const DEFAULT_NEUTRAL_SATURATION = 7
export const MAX_NEUTRAL_SATURATION = 40

export const TEXT_COLOR_TARGETS = {
  1: 10,
  2: 11,
  3: 11,
  4: 12,
  5: 12,
  6: 12,
  7: 12,
  8: 12,
  9: "neutralLow",
  10: "neutralLow",
  11: 3,
  12: 5,
} as const

export const ALPHA_COLOR_VALUES = [0.015, 0.05, 0.1, 0.15, 0.23, 0.32, 0.42, 0.53, 0.75, 0.85, 0.9, 0.95] as const

export const ZERO_SATURATION_LUMINANCE = `|{ywrnhaF?5)|{ywsnhaF?5)&+15:=@EUbjy"&,037:=S]jz`

/** Base indices of color modes in the encoded color matrix */
export const MATRIX_INDICES = {
  light: {
    color: 0,
    neutral: 17280,
  },
  dark: {
    color: 34560,
    neutral: 51840,
  },
} as const

/** Size (in characters) of different types of encoded segments */
export const SEGMENT_SIZE = {
  hue: 48, // == half-sat values + full-sat values
  set: 24, // == scale of values for either half-sat, or full-sat
  valuePair: 2, // == a saturation value + a luminosity value
  value: 1, // == a single, ASCII-encoded value
} as const

/** Encoded matrix of luminance values per hue, per mode */
export const COLOR_MATRIX = m

export const DECODE_DIFF = -26

export const COLOR_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export const DEFAULT_SOURCE_COLORS: ColorGenOptions = {
  // Core colors
  primary: { hue: DEFAULT_HUE, saturation: 0, isNeutral: true },
  secondary: { hue: DEFAULT_HUE, saturation: 100 },
  tertiary: { hue: 36, saturation: 85 },
  // Neutral colors
  neutralLow: { hue: 0, saturation: 0, contrast: 0 },
  neutralHigh: { hue: 0, saturation: 0, contrast: 100 },
  // Status colors
  info: { hue: 194, saturation: 95 },
  success: { hue: 123, saturation: 90 },
  warning: { hue: 33, saturation: 100 },
  error: { hue: 350, saturation: 75 },
  // Flavor colors
  tomato: { hue: 8, saturation: 90 },
  amber: { hue: 45, saturation: 100 },
  grass: { hue: 77, saturation: 100 },
  forest: { hue: 138, saturation: 90 },
  aqua: { hue: 193, saturation: 90 },
  indigo: { hue: 222, saturation: 90 },
  plum: { hue: 267, saturation: 90 },
  magenta: { hue: 313, saturation: 80 },
}

// TYPES //////////////////////////////////////////////////////////////////////////////////////////

export type ColorMode = "light" | "dark"
export type ColorType = "color" | "neutral"

export enum StaticColorName {
  neutralHigh = "neutralHigh",
  neutralLow = "neutralLow",
}

export enum CoreColorName {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

export enum StatusColorName {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}

// Colors from a broad spectrum of hues, for general purposes
export enum FlavorColorName {
  tomato = "tomato",
  amber = "amber",
  grass = "grass",
  forest = "forest",
  aqua = "aqua",
  indigo = "indigo",
  plum = "plum",
  magenta = "magenta",
}

// Transluscent colors
export enum AlphaColorName {
  primaryAlpha = "primaryAlpha",
  secondaryAlpha = "secondaryAlpha",
  tertiaryAlpha = "tertiaryAlpha",
  neutralHighAlpha = "neutralHighAlpha",
  neutralLowAlpha = "neutralLowAlpha",
}

export type ColorNumberKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type TextColor<Base extends string> = `${Base}Text`
export type ScaleColor<Base extends string> = `${Base}${ColorNumberKey}`

/** Source color can either be a hue, or a hue + saturation object */
export type SourceColor =
  | number
  | `${ScaleColorName}`
  | {
      hue: number
      saturation?: number
      isNeutral?: boolean
    }

/** Used for non-scaled colors in the palette */
export type StaticSourceColor = {
  hue: number
  saturation: number
  /** Value from 0 (no contrast) to 100 (max contrast) */
  contrast: number
}

export type ColorGenOptions = { [k in CoreColorName]: SourceColor } &
  { [k in StaticColorName]?: StaticSourceColor } &
  { [k in StatusColorName | FlavorColorName]?: SourceColor }

export type ScaleColorName = CoreColorName | StatusColorName | FlavorColorName | AlphaColorName
export type TextColorName = TextColor<ScaleColorName>

export type ThemeColor = `${StaticColorName}` | ScaleColor<ScaleColorName> | ScaleColor<TextColorName>

export type ColorPalette<T = string> = {
  [key in ThemeColor]: T
}
