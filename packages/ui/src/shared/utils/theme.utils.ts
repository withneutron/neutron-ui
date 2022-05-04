import chroma, { Color } from "chroma-js"
import { Theme } from "config"
import { IncomingMessage } from "http"
import { Locale } from "locale-enum"
import {
  AlphaColorName,
  ALPHA_COLOR_VALUES,
  ChromaColor,
  ChromaOptions,
  ColorGenOptions,
  ColorKeys,
  ColorMode,
  ColorPalette,
  DARK_ALPHA_COLOR_VALUES,
  DARK_CHROMA_OPTIONS,
  DARK_INFO_STATUS_TEXT_COLOR_TARGETS,
  DARK_LUMINANCE_VALUES,
  DARK_STATUS_INFO_COLOR_POINTERS,
  DARK_STATUS_INVERTED_LUMINANCE_VALUES,
  DARK_STATUS_LUMINANCE_VALUES,
  DARK_STATUS_TEXT_LUMINANCE,
  DARK_STATUS_TEXT_MAX_LUMINANCE,
  DEFAULT_COLOR_MODE,
  DEFAULT_SOURCE_COLORS,
  FG_COLOR_INDEX,
  FlavorColorName,
  HIGH_CONTRAST_INDEX,
  InitialProps,
  LIGHT_ALPHA_COLOR_VALUES,
  LIGHT_CHROMA_OPTIONS,
  LIGHT_INFO_STATUS_TEXT_COLOR_TARGETS,
  LIGHT_LUMINANCE_VALUES,
  LIGHT_STATUS_INFO_COLOR_POINTERS,
  LIGHT_STATUS_INVERTED_LUMINANCE_VALUES,
  LIGHT_STATUS_LUMINANCE_VALUES,
  LIGHT_STATUS_TEXT_LUMINANCE,
  LIGHT_STATUS_TEXT_MAX_LUMINANCE,
  NEUTRAL_ALPHA_COLOR_VALUES,
  NEUTRAL_DARK_LUMINANCE_VALUES,
  NEUTRAL_LIGHT_LUMINANCE_VALUES,
  NORMALIZATION_FACTOR,
  SemanticColorName,
  SemanticColors,
  StaticColor,
  StatusColorName,
  STATUS_COLOR_POINTERS,
  STATUS_TEXT_COLOR_TARGETS,
  TEXT_COLOR_TARGETS,
  ThemeColorName,
} from "../../shared/models/theme.models"
import { enumValues, capitalizeFirstLetter } from "../../shared/utils/common.utils"

const getChromaObject = (color: ChromaColor): Color => {
  if (typeof color === "string" && color.includes("hsl(")) {
    const div = color.includes(",") ? "," : " "
    const stringValues: string[] = color.replace("hsl(", "").replace(")", "").split(div)
    const values: [number, number, number] = [
      parseFloat(stringValues[0]),
      parseFloat(stringValues[1]) / 100,
      parseFloat(stringValues[2]) / 100,
    ]
    return chroma.hsl(...values)
  }
  return chroma(color)
}

const generateCssColors = (
  scale: number[],
  color: ChromaColor,
  method: "luminance" | "alpha",
  isStatic = false,
  isDark = false,
  isHighContrastNeutral = false
): string[] => {
  const src = getChromaObject(color)
  const saturation = Math.round((src.get("hsv.s") + Number.EPSILON) * 100) / 100
  return scale.map((value, index): string => {
    let adjustment = 1
    // Desaturate background + border colors of non-neutral colors
    if (!isStatic) {
      if (index < FG_COLOR_INDEX) {
        if (saturation > 0.5) {
          adjustment = isDark ? 0.75 : 0.6
        } else {
          adjustment = isDark ? 0.875 : 0.75
        }
      } else {
        adjustment += isDark ? 0.5 : 0
      }
    } else if (isDark && saturation > 0.15) {
      adjustment = (1 - saturation) * 0.65
    }
    const adjusted = src.set("hsv.s", src.get("hsv.s") * adjustment).set("hsl.h", src.get("hsl.h"))
    const max = isDark ? 1 : 0
    const highContrastValue = index >= HIGH_CONTRAST_INDEX ? max : value
    const actualValue = isHighContrastNeutral ? highContrastValue : value
    const scaled =
      method === "alpha" ? adjusted.alpha(actualValue) : adjusted.luminance(actualValue)
    return scaled.css("hsl")
  })
}

const getColorRange = (
  color: ChromaColor,
  luminanceValues: number[],
  isStatic = false,
  isDark = false,
  isHighContrastNeutral = false
): string[] =>
  generateCssColors(luminanceValues, color, "luminance", isStatic, isDark, isHighContrastNeutral)

const getAlphaColors = (
  color: ChromaColor,
  isStatic = false,
  isDark = false,
  neutral?: "dark" | "light",
  isHighContrastNeutral = false
): string[] => {
  const scaleBase =
    NEUTRAL_ALPHA_COLOR_VALUES[
      (isDark ? "darkBg" : "lightBg") as keyof typeof NEUTRAL_ALPHA_COLOR_VALUES
    ]
  const neutralScale = scaleBase[`${neutral}Fg` as keyof typeof scaleBase]
  return generateCssColors(
    neutral ? neutralScale : ALPHA_COLOR_VALUES,
    color,
    "alpha",
    isStatic,
    isDark,
    neutral && isHighContrastNeutral
  )
}
const getAlphaColorAtIndex = (
  index: number,
  color: ChromaColor,
  isDark = false,
  neutral?: "dark" | "light"
): string => {
  const scaleBase =
    NEUTRAL_ALPHA_COLOR_VALUES[
      (isDark ? "darkBg" : "lightBg") as keyof typeof NEUTRAL_ALPHA_COLOR_VALUES
    ]
  const neutralScale = scaleBase[`${neutral}Fg` as keyof typeof scaleBase]
  const colorScale = isDark ? DARK_ALPHA_COLOR_VALUES : LIGHT_ALPHA_COLOR_VALUES
  const isNeutral = !!neutral
  const isAdjustable = !isNeutral && index < FG_COLOR_INDEX
  const scale = isNeutral ? neutralScale : colorScale
  const alpha = scale[index]
  const src = getChromaObject(color)
  const satHSV = src.set("hsv.s", isDark ? 0.7 : 0.875)
  const satHSL = isAdjustable ? satHSV.set("hsl.s", Math.min(1, satHSV.get("hsl.s") * 0.875)) : src
  const saturated = satHSL
  const normalized = isAdjustable
    ? saturated.set("hsi.i", saturated.get("hsi.i") * 1.25)
    : saturated
  return normalized.alpha(alpha).css("hsl")
}

const getColorObject = (list: string[], name: string) =>
  list.reduce((output, value, index): Partial<ColorPalette> => {
    output[`${name}${index + 1}` as keyof typeof output] = value
    return output
  }, {} as Partial<ColorPalette>)

/** Generate a full set of color scales, with ranges from 1 (low contrast)
 * to 12 (high contrast), following the Radix Colors system.
 *
 * See {@link https://www.radix-ui.com/colors}
 */
export const generateThemeColors = (
  inputColors: ColorGenOptions,
  mode: ColorMode,
  isHighContrastNeutral = false
): ColorPalette => {
  const isDark = mode === "dark"
  const max = inputColors.neutralMax || isDark ? "#fff" : "#000"
  const min = inputColors.neutralMin || isDark ? "#000" : "#fff"
  // Init with neutral max and min (black & white)
  const colors: Partial<ColorPalette> = {
    black: "#000",
    white: "#fff",
    [StaticColor.neutralMax]: max,
    ...getColorObject(
      getAlphaColors(max, true, isDark, isDark ? "light" : "dark"),
      AlphaColorName.neutralMaxA
    ),
    [StaticColor.neutralMin]: min,
    ...getColorObject(
      getAlphaColors(min, true, isDark, isDark ? "dark" : "light"),
      AlphaColorName.neutralMinA
    ),
  }

  const colorNames: (SemanticColorName | FlavorColorName | StatusColorName)[] = [
    ...enumValues(SemanticColorName),
    ...enumValues(FlavorColorName),
    ...enumValues(StatusColorName),
  ]

  // Calculate the named colors and the color values that go with each one
  colorNames.forEach((name: ThemeColorName): void => {
    const color =
      inputColors[name as keyof typeof inputColors] ||
      DEFAULT_SOURCE_COLORS[name as keyof typeof DEFAULT_SOURCE_COLORS]
    if (!color) {
      return
    }
    const lowerName = name.toLowerCase()
    const isNeutral = lowerName.includes("neutral")
    const isInfo = lowerName.includes("info")
    const isStatus = !!StatusColorName[name as keyof typeof StatusColorName]
    const isFlavor = !!FlavorColorName[name as keyof typeof FlavorColorName]

    if (isStatus) {
      // Create status color scale (only a 3-point scale: min, normal, max)
      const isAlt = name === "warning" || (isDark && name === "info")
      const defaultTextColor = isDark || isAlt ? "$black" : "$white"
      const darkLum = isAlt ? DARK_STATUS_INVERTED_LUMINANCE_VALUES : DARK_STATUS_LUMINANCE_VALUES
      const lightLum = isAlt
        ? LIGHT_STATUS_INVERTED_LUMINANCE_VALUES
        : LIGHT_STATUS_LUMINANCE_VALUES
      const statusLuminanceValues = isDark ? darkLum : lightLum
      const typo = getChromaObject(color)
      const fgColor = isDark
        ? typo.luminance(DARK_STATUS_TEXT_LUMINANCE)
        : typo.luminance(LIGHT_STATUS_TEXT_LUMINANCE)
      const fgColorMax = isDark
        ? typo.luminance(DARK_STATUS_TEXT_MAX_LUMINANCE)
        : typo.luminance(LIGHT_STATUS_TEXT_MAX_LUMINANCE)
      colors[`${name}Foreground` as keyof typeof colors] = fgColor.css("hsl")
      colors[`${name}ForegroundMax` as keyof typeof colors] = fgColorMax.css("hsl")
      getColorRange(color, statusLuminanceValues, true).forEach((colorValue, index) => {
        const pointer = STATUS_COLOR_POINTERS[index as keyof typeof STATUS_COLOR_POINTERS]
        const textPointer =
          STATUS_TEXT_COLOR_TARGETS[index as keyof typeof STATUS_TEXT_COLOR_TARGETS]
        const infoTextPointer = isDark
          ? DARK_INFO_STATUS_TEXT_COLOR_TARGETS[
              index as keyof typeof DARK_INFO_STATUS_TEXT_COLOR_TARGETS
            ]
          : LIGHT_INFO_STATUS_TEXT_COLOR_TARGETS[
              index as keyof typeof LIGHT_INFO_STATUS_TEXT_COLOR_TARGETS
            ]
        const key = `${name}${pointer}`
        const infoPointer = isDark
          ? DARK_STATUS_INFO_COLOR_POINTERS[index as keyof typeof DARK_STATUS_INFO_COLOR_POINTERS]
          : LIGHT_STATUS_INFO_COLOR_POINTERS[index as keyof typeof LIGHT_STATUS_INFO_COLOR_POINTERS]
        const textColor = isInfo ? `$neutral${infoTextPointer}` : `$${name}${textPointer}`
        colors[key as keyof typeof colors] = isInfo ? `$neutral${infoPointer}` : colorValue
        colors[`text${capitalizeFirstLetter(key)}` as keyof typeof colors] = textPointer
          ? textColor
          : defaultTextColor
      })
    } else {
      // Create non-status color scale
      const darkScale = isNeutral ? NEUTRAL_DARK_LUMINANCE_VALUES : DARK_LUMINANCE_VALUES
      const lightScale = isNeutral ? NEUTRAL_LIGHT_LUMINANCE_VALUES : LIGHT_LUMINANCE_VALUES
      const luminanceValues = isDark ? darkScale : lightScale
      const neutralTextColor = "$neutralMin"
      getColorRange(
        color,
        luminanceValues,
        isNeutral,
        isDark,
        isNeutral && isHighContrastNeutral
      ).forEach((colorValue, index, scale) => {
        const pointer = index + 1
        const textPointer = TEXT_COLOR_TARGETS[pointer as keyof typeof TEXT_COLOR_TARGETS]
        const key = `${name}${pointer}`
        const alphaValue = (
          index < FG_COLOR_INDEX ? scale[FG_COLOR_INDEX as keyof typeof scale] : colorValue
        ) as ChromaColor
        colors[key as keyof typeof colors] = colorValue
        if (!isFlavor) {
          colors[`${name}A${pointer}` as keyof typeof colors] = getAlphaColorAtIndex(
            index,
            alphaValue,
            isDark,
            isDark ? "light" : "dark"
          )
        }
        colors[`text${capitalizeFirstLetter(key)}` as keyof typeof colors] = textPointer
          ? `$${name}${textPointer}`
          : neutralTextColor
      })
    }
  })
  return colors as ColorPalette
}

const normalizeSaturation = (
  color: Color,
  name: ThemeColorName,
  baseHue: number,
  forceHue: number
) => {
  const isNeutral = name.toLowerCase().includes("neutral")
  // Normalize saturation
  if (!isNeutral) {
    const saturation = Math.round((color.get("hsv.s") + Number.EPSILON) * 100) / 100
    const normalizedHue = Math.round(baseHue / 10)
    const factor = NORMALIZATION_FACTOR[normalizedHue as keyof typeof NORMALIZATION_FACTOR] || 2
    const correction = saturation / factor
    return color.set("hsi.s", 0.55 + correction).set("hsl.h", forceHue)
  }
  return color.set("hsl.h", forceHue)
}

const getColor = (
  name: ThemeColorName,
  base: Color,
  baseHue: number,
  shift: number,
  sat: number,
  lum: number
): string => {
  const output = base
    .set("hsl.h", (baseHue + shift) % 360)
    .set("hsi.s", sat)
    .luminance(lum)
  // Reset
  return normalizeSaturation(output, name, baseHue, (baseHue + shift) % 360).css("hsl")
}

const getColorPalettes = (
  color: ChromaColor,
  options: ChromaOptions
): [SemanticColors, SemanticColors, SemanticColors] => {
  const colors: SemanticColors[] = []
  const base = getChromaObject(color)
  const baseHue = base.get("hsl.h")
  const isTealish = 110 <= baseHue && baseHue <= 208
  const isGreenish = 60 <= baseHue && baseHue < 110
  const isYellowish = 35 <= baseHue && baseHue < 85
  const isRedToned = 279 <= baseHue || baseHue < 16
  const primaryColor = base.set("hsi.s", options.primarySat).luminance(options.mainFgLum)
  const primary = normalizeSaturation(
    primaryColor,
    SemanticColorName.primary,
    baseHue,
    baseHue
  ).css("hsl")
  // Tetrad
  const tetradSecondary = getColor(
    SemanticColorName.secondary,
    base,
    baseHue,
    180,
    options.secondarySat,
    options.mainFgLum
  )
  const tetradSecondaryVariant = getColor(
    SemanticColorName.secondary,
    base,
    baseHue,
    90,
    options.secondarySat,
    options.mainFgLum
  )
  // Triad
  const triadSecondary = getColor(
    SemanticColorName.secondary,
    base,
    baseHue,
    120,
    options.secondarySat,
    options.mainFgLum
  )
  const triadSecondaryVariant = getColor(
    SemanticColorName.secondary,
    base,
    baseHue,
    240,
    options.secondarySat,
    options.mainFgLum
  )
  // Split Complements
  const splitSecondary = getColor(
    SemanticColorName.secondary,
    base,
    baseHue,
    150,
    options.secondarySat,
    options.mainFgLum
  )
  const splitSecondaryVariant = getColor(
    SemanticColorName.secondary,
    base,
    baseHue,
    210,
    options.secondarySat,
    options.mainFgLum
  )

  // PALETTE 1: Pure Tetrad
  colors.push({
    primary,
    secondary: isTealish ? triadSecondaryVariant : tetradSecondary,
    neutral: getColor(
      SemanticColorName.neutral,
      base,
      getChromaObject(isTealish ? triadSecondaryVariant : tetradSecondary).get("hsl.h"),
      0,
      options.neutralSat,
      options.altBgLum
    ),
  } as SemanticColors)
  // PALETTE 2: Pure Triad
  colors.push({
    primary,
    secondary: isGreenish || isRedToned ? triadSecondary : tetradSecondaryVariant,
    neutral: getColor(
      SemanticColorName.neutral,
      base,
      getChromaObject(isGreenish || isRedToned ? triadSecondary : tetradSecondaryVariant).get(
        "hsl.h"
      ),
      0,
      options.neutralSat,
      options.altBgLum
    ),
  } as SemanticColors)
  // PALETTE 3: Pure Split Complements
  colors.push({
    primary,
    secondary: isYellowish
      ? splitSecondaryVariant
      : isRedToned
      ? triadSecondaryVariant
      : splitSecondary,
    neutral: getColor(
      SemanticColorName.neutral,
      base,
      getChromaObject(
        isYellowish ? splitSecondaryVariant : isRedToned ? triadSecondaryVariant : splitSecondary
      ).get("hsl.h"),
      0,
      options.neutralSat,
      options.altBgLum
    ),
  } as SemanticColors)

  return colors as [SemanticColors, SemanticColors, SemanticColors]
}

/** Get a set of 3 complementary color palettes, from one base hue */
export const getComplementaryColors = (
  hue: number,
  saturation = 0.875,
  mode: ColorMode = "light"
): [SemanticColors, SemanticColors, SemanticColors] => {
  if (hue < 0 || hue > 360) {
    throw new Error("Parameter `hue` must be a number between 0 and 360")
  } else if (saturation < 0 || saturation > 1) {
    throw new Error("Parameter `saturation` must be a number between 0 and 1")
  }
  const color: ChromaColor = `hsl(${hue}, ${saturation * 100}%, 50%)`
  return mode === "dark"
    ? getColorPalettes(color, DARK_CHROMA_OPTIONS)
    : getColorPalettes(color, LIGHT_CHROMA_OPTIONS)
}

/** Generates a set of complementary colors from one base hue. */
export const generatePaletteFromHue = (
  hue: number,
  variant: 1 | 2 | 3 = 1,
  saturation = 0.875,
  mode: ColorMode = "light"
): SemanticColors => getComplementaryColors(hue, saturation, mode)[variant - 1]

/** Remaps a color to a semantic alias */
export function mapColorToAlias<T, K extends string>(
  color: T,
  alias: string
): Record<ColorKeys<K>, string> {
  return Object.keys(color).reduce(
    (output: Record<string, string>, current: string, index: number) => {
      output[`${alias}${index + 1}` as keyof typeof output] = `$${current}`
      return output
    },
    {}
  ) as Record<ColorKeys<K>, string>
}

/** Helper function to alter color saturation */
export function saturate(color: ChromaColor, factor: number): string {
  const base = getChromaObject(color)
  return base.set("hsi.s", factor).css("hsl")
}

function isRequest(req: IncomingMessage | Request): req is Request {
  return (req as Request).credentials !== undefined
}

/** Helper function to get the user's prefered color mode from headers */
export function getColorModeFromHeaders(req: IncomingMessage | Request): ColorMode {
  const key = "sec-ch-prefers-color-scheme"
  let colorMode: ColorMode = "light"
  if (isRequest(req)) {
    colorMode = req.headers.get(key) as ColorMode
  } else {
    colorMode = (req.headers[key] ?? req.rawHeaders[key]) as ColorMode
  }
  return colorMode || DEFAULT_COLOR_MODE
}

/** Helper function to get the user's device type (mobile or not) from headers */
export function getIsMobileFromHeaders(req: IncomingMessage | Request): boolean {
  const key = "sec-ch-ua-mobile"
  if (isRequest(req)) {
    return String(req.headers.get(key)).includes("?1")
  } else {
    return String(req.headers[key] ?? req.rawHeaders[key]).includes("?1")
  }
}

/** Parse HTTP accept-language header of the user browser */
export function getLanguageFromHeaders(req: IncomingMessage | Request): Locale[] {
  const result: Locale[] = []
  let acceptLangs: string | null | undefined

  const key = "accept-language"
  if (isRequest(req)) {
    acceptLangs = req.headers.get(key)
  } else {
    acceptLangs = req.headers[key] ?? req.rawHeaders[key]
  }

  if (!acceptLangs) {
    return result
  }
  const pairs = acceptLangs.split(",")
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split(";")
    const locale = Locale[pair[0].replace("-", "_") as keyof typeof Locale]
    result.push(locale)
  }
  return result
}

/** Get initial props for Next.js */
export function getInitialProps<
  T extends { req?: IncomingMessage; defaultLocale?: string },
  O extends Record<any, any>
>(ctx: T, props: O | Record<string, unknown> = {}): InitialProps {
  const { req, defaultLocale } = ctx
  const colorMode = !req ? undefined : getColorModeFromHeaders(req)
  const isMobile = !req ? undefined : getIsMobileFromHeaders(req)
  const locale = !req
    ? (defaultLocale as Locale)
    : getLanguageFromHeaders(req)[0] || (defaultLocale as Locale)

  return { ...props, colorMode, isMobile, locale }
}

/** Get HTML props for Next.js */
export function getHtmlProps(initialProps: InitialProps, appTheme: Theme, appDarkTheme: Theme) {
  const colorMode = initialProps.colorMode ?? DEFAULT_COLOR_MODE
  return {
    dir: "ltr",
    id: "html",
    lang: initialProps.locale ?? Locale.en_US,
    className: colorMode === "dark" ? String(appDarkTheme) : String(appTheme),
  }
}
