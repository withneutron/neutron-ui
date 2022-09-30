import { m } from "./encodedColors.models"

export const DEFAULT_NEUTRAL_SATURATION = 0.07
export const MAX_NEUTRAL_SATURATION = 0.4

export const TEXT_COLOR_TARGETS = {
  1: 10,
  2: 11,
  3: 11,
  4: 12,
  5: 12,
  6: 12,
  7: 12,
  8: 12,
  9: "neutralMin",
  10: "neutralMin",
  11: 3,
  12: 5,
} as const

export const ALPHA_COLOR_VALUES = [0.02, 0.5, 0.9] as const

export const ZERO_SATURATION_LUMINANCE = `|{ywrnhaF?5)|{ywsnhaF?5)&+15:=@EUbjy"&,037:=S]jz`

/**
 * [0] light color;
 * [1] light neutral;
 * [2] dark color;
 * [3] dark neutral;
 */
export const MODES = [0, 17280, 34560, 51840] as const
export const SEGMENT = {
  hue: 48, // == half-sat values + full-sat values
  set: 24, // == scale of values for either half-sat, or full-sat
  valuePair: 2, // == a saturation value + a luminosity value
  value: 1, // == a single, ASCII-encoded value
} as const

export const MATRIX = m
