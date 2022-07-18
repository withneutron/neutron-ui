import {
  ColorKeys,
  ColorNumberKey,
  ColorGenOptions,
  ColorMode,
  StaticColor,
  AlphaColorName,
  SemanticColorName,
  FlavorColorName,
  StatusColorName,
  ThemeColorName,
  DEFAULT_SOURCE_COLORS,
  DARK_STATUS_INVERTED_LUMINANCE_VALUES,
  DARK_STATUS_LUMINANCE_VALUES,
  LIGHT_STATUS_INVERTED_LUMINANCE_VALUES,
  LIGHT_STATUS_LUMINANCE_VALUES,
  DARK_STATUS_TEXT_LUMINANCE,
  LIGHT_STATUS_TEXT_LUMINANCE,
  DARK_STATUS_TEXT_MAX_LUMINANCE,
  LIGHT_STATUS_TEXT_MAX_LUMINANCE,
  STATUS_COLOR_POINTERS,
  STATUS_TEXT_COLOR_TARGETS,
  DARK_INFO_STATUS_TEXT_COLOR_TARGETS,
  LIGHT_INFO_STATUS_TEXT_COLOR_TARGETS,
  DARK_STATUS_INFO_COLOR_POINTERS,
  LIGHT_STATUS_INFO_COLOR_POINTERS,
  NEUTRAL_DARK_LUMINANCE_VALUES,
  DARK_LUMINANCE_VALUES,
  NEUTRAL_LIGHT_LUMINANCE_VALUES,
  LIGHT_LUMINANCE_VALUES,
  TEXT_COLOR_TARGETS,
  FG_COLOR_INDEX,
  ChromaColor,
} from "../../shared/models"
import {
  getAlphaColors,
  enumValues,
  getChromaObject,
  getColorRange,
  capitalizeFirstLetter,
  getAlphaColorAtIndex,
} from "../../shared/utils"
import {
  CssValue,
  ThemePropValue,
  ScaleEntry,
  ColorPalette,
  ColorSetter,
  BaseVars,
  THEME_PREFIX,
  CssValueMap,
} from "./models"

/** Converts a set of vars to CSS values (i.e., using the var set's `ref` as a value) */
export function getCssMapFromVars<T extends BaseVars>(vars: T) {
  const entries: [keyof T, ScaleEntry][] = Object.entries(vars)
  return entries.reduce((out: Record<keyof T, string>, [key, entry]: [keyof T, ScaleEntry]) => {
    out[key] = entry.ref
    return out
  }, {} as Record<keyof T, string>)
}

/** Converts a set of vars to CSS values (i.e., using the var set's `ref` as a value) */
export function getThemePropsFromCssMap<T extends CssValueMap>(vars: T) {
  const entries: [keyof T, CssValue][] = Object.entries(vars)
  return entries.reduce((out: Record<keyof T, ThemePropValue>, [key, value]: [keyof T, CssValue]) => {
    out[key] = typeof value === "string" ? value : addPrefix(String(key))
    return out
  }, {} as Record<keyof T, ThemePropValue>)
}

export function addPrefix(value: string) {
  return `${THEME_PREFIX}${value}`
}

/** Converts a CSS Alias Map into theme props */
export function getPropsFromAliasMap<T extends Record<string | number, string>>(map: T) {
  return Object.entries(map).reduce((out: Record<keyof T, string>, [key, value]: [keyof T, string]) => {
    // Add a prefix, to convert the value to a "themed value"
    out[key] = addPrefix(value)
    return out
  }, {} as Record<keyof T, string>)
}

/** Generates a color object (w/ keys numbered 1-12), from a list of 12 values */
export function getColorObjectFromValueList<N extends string>(name: N, list: string[], setValue: ColorSetter) {
  return list.reduce((output, value, index): Record<ColorKeys<N>, ScaleEntry> => {
    const colorNumber = (index + 1) as ColorNumberKey
    const key: ColorKeys<N> = `${name}${colorNumber}`
    output[key] = setValue(key as keyof ColorPalette, value)
    return output
  }, {} as Record<ColorKeys<N>, ScaleEntry>)
}

/** Generates a color mode-based palette */
export function generateThemeColors(
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
      const darkVars = isNeutral ? NEUTRAL_DARK_LUMINANCE_VALUES : DARK_LUMINANCE_VALUES
      const lightScale = isNeutral ? NEUTRAL_LIGHT_LUMINANCE_VALUES : LIGHT_LUMINANCE_VALUES
      const luminanceValues = isDark ? darkVars : lightScale
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
